import { MailerService } from '@devon4node/mailer';
import { Injectable, Optional } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import * as md5 from 'md5';
import * as moment from 'moment';
import { EntityManager, Repository } from 'typeorm';
import { ConfigurationService } from '../core/configuration/configuration.service';
import { WinstonLogger } from '../shared/logger/winston.logger';
import { BookingTypes } from './model/booking-types';
import { BookingSearch } from './model/dto/booking-search.dto';
import { Booking } from './model/entities/booking.entity';
import { InvitedGuest } from './model/entities/invited-guest.entity';
import { Table } from './model/entities/table.entity';
import { User } from '../user/model/entity/user.entity';

@Injectable()
export class BookingService {
  // Make this with arrow function in order to bind the logger in the correct moment
  // prettier-ignore
  private logMailError = (reject: any) => {
    this.logger.error(reject.message, reject);
  }

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(InvitedGuest)
    private readonly invitedGuestRepository: Repository<InvitedGuest>,
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
    private readonly configService: ConfigurationService,
    private readonly logger: WinstonLogger,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @Optional() private readonly mailer?: MailerService,
  ) {}

  getBookingByToken(token: string): Promise<Booking | undefined> {
    return this.bookingRepository.findOne({
      where: {
        bookingToken: token,
      },
    });
  }

  getInvitedGuestByToken(token: string): Promise<InvitedGuest | undefined> {
    return this.invitedGuestRepository.findOne({
      where: {
        guestToken: token,
      },
    });
  }

  async createBooking(
    booking: Booking,
    invitedGuests?: InvitedGuest[],
    user?: User,
  ) {
    let newBooking = await this.setBookingValues(booking);

    if (user && user.id) {
      newBooking.userId = user.id;
    }

    newBooking = await this.bookingRepository.save(newBooking);

    if (newBooking.bookingType === BookingTypes.INVITED && invitedGuests) {
      const invited: InvitedGuest[] = this.createInvitedGuest(
        invitedGuests,
        newBooking.id,
      );

      newBooking.invitedGuests = await this.invitedGuestRepository.save(
        invited,
      );
    }

    this.sendNewEventEmails(newBooking);

    return newBooking;
  }

  private sendNewEventEmails(newBooking: Booking) {
    if (this.mailer) {
      this.mailer
        .sendTemplateMail(
          {
            to: newBooking.email,
            subject: 'Booking confirmation',
          },
          'confirmedBooking',
          {
            clientUrl: this.configService.clientUrl,
            booking: newBooking,
            invitedGuest: newBooking.invitedGuests,
          },
        )
        .catch(this.logMailError);

      if (newBooking.invitedGuests) {
        newBooking.invitedGuests.forEach((invitedGuest: InvitedGuest) => {
          this.mailer!.sendTemplateMail(
            {
              to: invitedGuest.email,
              subject: 'Event invite',
            },
            'invitedGuestInvitation',
            {
              clientUrl: this.configService.clientUrl,
              booking: newBooking,
              invitedGuest,
            },
          ).catch(this.logMailError);
        });
      }
    }
  }

  private createInvitedGuest(
    invitedGuests: InvitedGuest[],
    idBooking: number,
  ): InvitedGuest[] {
    const now = moment();
    return invitedGuests.map(invited => {
      return plainToClass(InvitedGuest, {
        bookingId: idBooking,
        guestToken:
          'GB_' +
          now.format('YYYYMMDD') +
          '_' +
          md5(invited.email + now.format('YYYYMMDDHHmmss')),
        modificationDate: now.toDate(),
        email: invited.email,
      });
    });
  }

  private async setBookingValues(booking: Booking): Promise<Booking> {
    const newBooking = plainToClass(Booking, booking);
    const bookingDate = moment(booking.bookingDate);
    const now = moment();
    let tableId: number | undefined;

    if (newBooking.bookingType === BookingTypes.COMMON) {
      tableId = await this.getFreeTable(
        newBooking.bookingDate,
        newBooking.assistants!,
      );

      if (!tableId) {
        throw new Error('Not free tables for your booking date');
      }
    }

    const calculatedValues: Partial<Booking> = {
      bookingToken:
        'CB_' +
        now.format('YYYYMMDD') +
        '_' +
        md5(newBooking.email + now.format('YYYYMMDDHHmmss')),
      expirationDate: bookingDate.subtract(1, 'hour').toDate(),
      canceled: false,
      creationDate: now.toDate(),
      tableId,
    };

    Object.assign(newBooking, calculatedValues);

    return newBooking;
  }

  async searchBooking(search: BookingSearch): Promise<[Booking[], number]> {
    let queryBuilder = this.bookingRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Booking.invitedGuests', 'invitedGuests')
      .leftJoinAndSelect('Booking.table', 'table')
      .leftJoinAndSelect('Booking.order', 'order')
      .leftJoinAndSelect('Booking.user', 'user')
      .leftJoinAndSelect('order.orderLines', 'orderLines')
      .where('Booking.bookingDate >= :now', { now: new Date() });

    if (search.bookingToken) {
      queryBuilder = queryBuilder.andWhere('Booking.bookingToken = :token', {
        token: search.bookingToken,
      });
    }

    if (search.email) {
      queryBuilder = queryBuilder.andWhere('LOWER(Booking.email) LIKE :email', {
        email: '%' + search.email.toLowerCase() + '%',
      });
    }

    if (search.pageable) {
      if (search.pageable.sort) {
        search.pageable.sort.forEach(elem => {
          queryBuilder = queryBuilder.addOrderBy(
            'Booking.' + elem.property,
            elem.direction,
          );
        });
      }

      queryBuilder = queryBuilder
        .take(search.pageable.pageSize)
        .skip(search.pageable.pageSize * search.pageable.pageNumber);
    }

    return queryBuilder.getManyAndCount();
  }

  async updateInvitedGuest(token: string, accepted: boolean) {
    const invitedGuest = await this.invitedGuestRepository.findOne({
      relations: ['booking'],
      where: { guestToken: token },
    });

    if (!invitedGuest) {
      throw new Error('Invalid token');
    }

    if (invitedGuest.accepted === false || invitedGuest.accepted === accepted) {
      throw new Error('You can not modify this value again.');
    }

    const now = moment();
    const bookingDate = moment(invitedGuest.booking!.bookingDate).subtract(
      10,
      'minutes',
    );
    if (now.isAfter(bookingDate)) {
      throw new Error('You can not cancel at this time');
    }

    const expirationDate = moment(invitedGuest.booking!.expirationDate);
    if (now.isAfter(expirationDate)) {
      invitedGuest.booking!.tableId = await this.getFreeTable(
        invitedGuest.booking!.bookingDate,
        await this.getAcceptedAssistants(invitedGuest.booking!.bookingToken!),
      );
    }

    invitedGuest.accepted = accepted;
    await this.invitedGuestRepository.save(invitedGuest);

    if (accepted) {
      this.sendAcceptedEmails(invitedGuest, accepted);
    } else {
      this.sendRejectedEmails(invitedGuest, accepted);
    }
  }

  getAcceptedAssistants(bookingToken: string): Promise<number> {
    return this.invitedGuestRepository
      .createQueryBuilder()
      .innerJoin('Booking', 'booking', 'InvitedGuest.id = booking.id')
      .where('booking.bookingToken = :bookingToken', { bookingToken })
      .andWhere('InvitedGuest.accepted = :accepted', { acepted: true })
      .getCount();
  }

  private sendRejectedEmails(invitedGuest: InvitedGuest, accepted: boolean) {
    if (this.mailer) {
      this.mailer
        .sendTemplateMail(
          {
            to: invitedGuest.email,
            subject: 'Invite declined',
          },
          'declinedInvitedGuest',
          {
            booking: invitedGuest.booking,
            invitedGuest,
          },
        )
        .catch(this.logMailError);
      this.mailer
        .sendTemplateMail(
          {
            to: invitedGuest.booking!.email,
            subject: 'Invite declined',
          },
          'invitedGuestUpdate',
          {
            booking: invitedGuest.booking,
            invitedGuest,
            accepted,
          },
        )
        .catch(this.logMailError);
    }
  }

  private sendAcceptedEmails(invitedGuest: InvitedGuest, accepted: boolean) {
    if (this.mailer) {
      this.mailer
        .sendTemplateMail(
          {
            to: invitedGuest.email,
            subject: 'Invite accepted',
          },
          'confirmedInvitedGuest',
          {
            booking: invitedGuest.booking,
            invitedGuest,
          },
        )
        .catch(this.logMailError);
      this.mailer
        .sendTemplateMail(
          {
            to: invitedGuest.booking!.email,
            subject: 'Invite accepted',
          },
          'invitedGuestUpdate',
          {
            booking: invitedGuest.booking,
            invitedGuest,
            accepted,
          },
        )
        .catch(this.logMailError);
    }
  }

  async cancelBooking(token: string) {
    const booking = await this.bookingRepository.findOne({
      where: { bookingToken: token },
      relations: ['invitedGuests'],
    });

    if (!booking) {
      throw new Error('Invalid token');
    }

    const invitedGuests = booking.invitedGuests;

    if (booking.canceled) {
      throw new Error('Already canceled');
    }

    const now = moment();
    const expirationDate = moment(booking.expirationDate);
    if (now.isAfter(expirationDate)) {
      throw new Error('You can not cancel at this time');
    }

    await this.entityManager.transaction(async manager => {
      await this.deleteBookingOrder(booking.id, manager);

      if (invitedGuests) {
        await manager.delete(
          InvitedGuest,
          invitedGuests.map(guest => guest.id),
        );
        booking.invitedGuests = undefined;
      }

      await manager.delete(Booking, booking.id);
    });

    this.sendCanceledEmails(booking, invitedGuests);
  }

  private sendCanceledEmails(
    booking: Booking,
    invitedGuests: InvitedGuest[] | undefined,
  ) {
    if (this.mailer) {
      this.mailer
        .sendTemplateMail(
          {
            to: booking.email,
            subject: 'Event cancellation',
          },
          'canceledBooking',
          {
            booking,
          },
        )
        .catch(this.logMailError);
      if (invitedGuests) {
        invitedGuests.forEach(guest => {
          this.mailer!.sendTemplateMail(
            {
              to: guest.email,
              subject: 'Event cancellation',
            },
            'canceledInvitedGuest',
            {
              booking,
              invitedGuest: guest,
            },
          ).catch(this.logMailError);
        });
      }
    }
  }

  private async deleteBookingOrder(
    bookingId: string | number,
    manager: EntityManager,
  ) {
    const orderIds = manager
      .createQueryBuilder()
      .from('Order', 'Order')
      .select('id')
      .where('Order.idBooking = :id');
    const orderLineId = manager
      .createQueryBuilder()
      .from('OrderLine', 'OrderLine')
      .select('id')
      .where('OrderLine.idOrder IN (' + orderIds.getQuery() + ')');

    return Promise.all([
      manager
        .createQueryBuilder()
        .from('OrderDishExtraIngredient', 'orderDish')
        .delete()
        .where('idOrderLine IN (' + orderLineId.getQuery() + ')')
        .setParameter('id', bookingId)
        .execute(),
      orderLineId
        .delete()
        .from('OrderLine', 'orderLine')
        .setParameter('id', bookingId)
        .execute(),
      manager
        .createQueryBuilder()
        .delete()
        .from('Orders', 'Orders')
        .where('Orders.idBooking = :id')
        .setParameter('id', bookingId)
        .execute(),
    ]);
  }

  private async getFreeTable(
    bookingDate: Date,
    assistants: number,
  ): Promise<number | undefined> {
    const date = moment(bookingDate);

    const tables = await this.tableRepository
      .createQueryBuilder()
      .leftJoin('Booking', 'booking', 'Table.id = booking.idTable')
      .where('seatsNumber >= :assistants', { assistants })
      .andWhere(
        '(booking.bookingDate IS NULL OR booking.bookingDate NOT BETWEEN CAST(:date1 AS DATE) AND CAST(:date2 AS DATE))',
        {
          date1: date.add(-1, 'hour').toDate(),
          date2: bookingDate,
        },
      )
      .orderBy('seatsNumber', 'ASC')
      .getMany();

    return tables && tables.length > 0 ? tables[0].id : undefined;
  }

  getBookingById(id: number | string): Promise<Booking | undefined> {
    return this.bookingRepository.findOne(id);
  }

  getInvitedGuestById(id: number | string): Promise<InvitedGuest | undefined> {
    return this.invitedGuestRepository.findOne(id);
  }
}
