import { Injectable, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository, EntityManager, Brackets } from 'typeorm';
import { BookingService } from '../booking/booking.service';
import { Pageable } from '../shared/model/dto/pageable.dto';
import { OrderLineCTO } from './model/dto/order-lineCTO.dto';
import { OrderLine } from './model/entities/order-line.entity';
import { Order } from './model/entities/order.entity';
import { InvitedGuest } from '../booking/model/entities/invited-guest.entity';
import { Booking } from '../booking/model/entities/booking.entity';
import { MailerService } from '@devon4node/mailer';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderLine)
    private readonly orderLineRepository: Repository<OrderLine>,
    private readonly bookingService: BookingService,
    private readonly manager: EntityManager,
    @Optional() private readonly mailer?: MailerService,
  ) {}

  async createOrder(
    orderLine: OrderLineCTO[],
    bookingToken: string,
  ): Promise<Order> {
    let newOrder: Order | undefined = new Order();
    let booking: Booking | InvitedGuest | undefined;

    if (bookingToken.startsWith('CB_')) {
      const book = await this.bookingService.getBookingByToken(bookingToken);
      if (book && book.orderId) {
        throw new Error('Booking already has an order');
      }

      newOrder.bookingId = book!.id;
      booking = book;
    } else if (bookingToken.startsWith('GB_')) {
      const invitedGuest = await this.bookingService.getInvitedGuestByToken(
        bookingToken,
      );
      if (invitedGuest && invitedGuest.orderId) {
        throw new Error('Booking already has an order');
      }

      newOrder.bookingId = invitedGuest!.bookingId;
      newOrder.invitedGuestId = invitedGuest!.id;
      booking = invitedGuest;
    }

    newOrder = await this.orderRepository.save(newOrder);

    const orderLines = orderLine.map(elem => {
      const newOrderLine = plainToClass(OrderLine, elem.orderLine);
      newOrderLine.ingredients = elem.extras;

      newOrderLine.orderId = newOrder!.id;

      return newOrderLine;
    });

    await this.orderLineRepository.save(orderLines);

    newOrder = await this.orderRepository.findOne({
      relations: ['orderLines', 'orderLines.dish', 'orderLines.ingredients'],
      where: {
        id: newOrder.id,
      },
    });

    if (this.mailer) {
      this.mailer.sendTemplateMail(
        {
          to: booking!.email,
          subject: 'Order confirmation',
        },
        'order',
        {
          booking,
          order: newOrder,

          price: this.getTotalPrice(newOrder!),
        },
      );
    }

    return newOrder!;
  }

  private getTotalPrice(order: Order) {
    return order.orderLines!.reduce((total, orderLine) => {
      return (
        Number(orderLine.amount!) *
          (Number(orderLine.dish!.price!) +
            orderLine.ingredients!.reduce((totalIngredients, ingredient) => {
              return totalIngredients + Number(ingredient.price!);
            }, 0)) +
        total
      );
    }, 0);
  }

  async deleteOrder(orderId: string): Promise<void> {
    const order = await this.orderRepository.findOne(orderId);
    let booking: Booking | InvitedGuest | undefined;

    if (!order) {
      throw new Error('Wrong id');
    }

    if (order.invitedGuestId) {
      booking = await this.bookingService.getInvitedGuestById(
        order.invitedGuestId,
      );
    } else {
      booking = await this.bookingService.getBookingById(order.bookingId);
    }

    if (!booking) {
      throw new Error('Wrong id');
    }

    await this.manager.transaction(eManager => {
      const orderLineId = eManager
        .createQueryBuilder()
        .from('OrderLine', 'OrderLine')
        .select('id')
        .where('OrderLine.idOrder = :id');

      return Promise.all([
        eManager
          .createQueryBuilder()
          .from('OrderDishExtraIngredient', 'orderDish')
          .delete()
          .where('idOrderLine IN (' + orderLineId.getQuery() + ')')
          .setParameter('id', order.id)
          .execute(),
        orderLineId
          .createQueryBuilder()
          .delete()
          .from('OrderLine', 'orderLine')
          .setParameter('id', order.id)
          .execute(),
        eManager.delete(Order, order.id),
      ]);
    });
  }

  searchOrder(pageable: Pageable, email?: string, token?: string) {
    let queryBuilder = this.orderRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Order.booking', 'booking')
      .leftJoinAndSelect('Order.orderLines', 'orderLines')
      .leftJoinAndSelect('orderLines.dish', 'dish')
      .leftJoinAndSelect('orderLines.ingredients', 'ingredients')
      .leftJoinAndSelect('booking.table', 'table')
      .leftJoinAndSelect('booking.invitedGuests', 'invitedGuests')
      .leftJoinAndSelect('booking.user', 'user')
      .where('booking.bookingDate >= :now', { now: new Date() });

    if (token) {
      if (token.startsWith('GB')) {
        queryBuilder = queryBuilder.andWhere(
          'invitedGuests.guestToken = :token',
          {
            token,
          },
        );
      } else {
        queryBuilder = queryBuilder.andWhere('booking.bookingToken = :token', {
          token,
        });
      }
    }

    if (email) {
      queryBuilder = queryBuilder.andWhere(
        new Brackets(cb => {
          cb.where('LOWER(booking.email) LIKE :email', {
            email: '%' + email.toLowerCase() + '%',
          }).orWhere('LOWER(invitedGuests.email) LIKE :email', {
            email: '%' + email.toLowerCase() + '%',
          });
        }),
      );
    }

    if (pageable) {
      if (pageable.sort) {
        pageable.sort.forEach(elem => {
          queryBuilder = queryBuilder.addOrderBy(elem.property, elem.direction);
        });
      }

      queryBuilder = queryBuilder
        .take(pageable.pageSize)
        .skip(pageable.pageSize * pageable.pageNumber);
    }

    return queryBuilder.getManyAndCount();
  }
}
