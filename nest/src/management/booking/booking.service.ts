import { Injectable, HttpStatus, HttpException, Inject } from '@nestjs/common';
import { BaseService } from 'shared/base.service';
import { Booking } from './models/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingVm, BookingDTO } from './models/view-models/booking-vm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { UserService } from 'management/user/user.service';
import { CustomFilter, BookingResponse, BookingView } from 'shared/interfaces';
import { EmailService } from 'shared/email/email.service';

@Injectable()
export class BookingService extends BaseService<Booking> {
  constructor(
    @InjectRepository(Booking)
    private readonly _bookingRepository: Repository<Booking>,
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(EmailService) private readonly _emailService: EmailService,
  ) {
    super();
    this._repository = _bookingRepository;
  }

  async createBooking(input: CreateBookingVm): Promise<BookingDTO> {
    try {
      const params = input.booking;
      let entity = await this._repository.create(params);
      const expiration: Date = new Date(params.bookingDate);
      expiration.setHours(expiration.getHours() + 4);
      entity.expirationDate = expiration;
      entity.bookingToken = await this.genToken();
      const user = await this._userService.find({ email: params.email });
      if (user) entity.user = user;
      entity = await this._repository.save(entity);
      this._emailService.sendConfirmationEmail(entity);
      return this.toDTO(entity);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findBookings(filter: CustomFilter): Promise<BookingResponse> {
    try {
      const response: BookingResponse = {
        pagination: {
          page: filter.pagination.page,
          size: filter.pagination.size,
          total: 0,
        },
        result: [],
      };
      const offset = (filter.pagination.page - 1) * filter.pagination.size;
      const total = await this._repository.count();
      // Math.ceil(total / filter.pagination.size); if it must return total pages instead of total elements left
      response.pagination.total = total - offset;
      const query = await this.createQuery(filter, offset);
      const reservations = await query.getMany();
      for (const element of reservations) {
        const resultElement: BookingView = {
          booking: await this.toDTO(element),
          user: element.user,
          invitedGuests: element.invitedGuests,
          order: element.order,
          table: element.table,
          orders: element.orders,
        };
        response.result.push(resultElement);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async genToken(): Promise<string> {
    return `${Math.random()
      .toString(36)
      .substr(2)}${Math.random()
      .toString(36)
      .substr(2)}`;
  }

  async createQuery(
    filter: CustomFilter,
    offset: number,
  ): Promise<SelectQueryBuilder<Booking>> {
    try {
      const query = await this._repository.createQueryBuilder('booking');
      query.leftJoinAndSelect('booking.user', 'user');
      query.leftJoinAndSelect('booking.order', 'order');
      query.leftJoinAndSelect('booking.orders', 'orders');
      query.leftJoinAndSelect('booking.table', 'table');
      query.leftJoinAndSelect('booking.invitedGuests', 'invitedGuest');
      if (filter.sort.length !== 0) {
        if (filter.sort[0].direction === 'ASC') {
          query.addOrderBy(`booking.${filter.sort[0].name}`, 'ASC');
        } else {
          query.addOrderBy(`booking.${filter.sort[0].name}`, 'DESC');
        }
      }
      query.skip(offset);
      query.take(filter.pagination.size);
      return query;
    } catch (error) {
      throw error;
    }
  }

  async toDTO(input: Booking): Promise<BookingDTO> {
    try {
      if (input instanceof Booking) {
        const response: BookingDTO = new BookingDTO();
        response.id = input.id;
        response.name = input.name;
        response.expirationDate = input.expirationDate.getTime().toString();
        response.email = input.email;
        response.bookingDate = input.bookingDate.getTime().toString();
        response.bookingToken = input.bookingToken;
        if (input.assistants) response.assistants = input.assistants;
        response.canceled = input.canceled;
        response.creationDate = input.createdAt.getTime().toString();
        if (input.comment) response.comment = input.comment;
        if (input.bookingType === 0) {
          response.bookingType = 'COMMON';
        } else {
          response.bookingType = 'INVITED';
        }
        if (input.user) response.userId = input.user.id;
        if (input.table) response.tableId = input.table.id;
        return response;
      }
    } catch (error) {
      return null;
    }
  }

  async findOne(filter: {}): Promise<Booking> {
    return await this._repository.findOne(filter);
  }
}
