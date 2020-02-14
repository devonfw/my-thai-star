import { Injectable, Optional } from '@nestjs/common';
import { BookingService } from '../../../booking/services/booking.service';
import { OrderRepository } from '../../repositories/order.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderLine } from '../../model/entities/order-line.entity';
import { Repository } from 'typeorm';
import { OrderLineCTO } from '../../model/dto/order-lineCTO.dto';
import { Order } from '../../model/entities/order.entity';
import { InvitedGuest } from '../../../booking/model/entities/invited-guest.entity';
import { Booking } from '../../../booking/model/entities/booking.entity';
import { InvalidTokenException } from '../../../shared/exceptions/invalid-token.exception';
import { OrderAlreadyDoneException } from '../../exceptions/order-already-done.exception';
import { plainToClass } from 'class-transformer';
import { OrderMailerUseCase } from './order-mailer.use-case';
import { GuestNotAccpetedException } from '../../exceptions/guest-not-accepted.exception';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly bookingService: BookingService,
    private readonly orderRepository: OrderRepository,
    @InjectRepository(OrderLine)
    private readonly orderLineRepository: Repository<OrderLine>,
    @Optional() private readonly orderMailer?: OrderMailerUseCase,
  ) {}

  async createOrder(orderLine: OrderLineCTO[], bookingToken: string): Promise<Order> {
    let newOrder: Order | undefined = new Order();
    let booking: Booking | InvitedGuest | undefined;

    if (bookingToken.startsWith('CB_')) {
      const book = await this.bookingService.getBookingByToken(bookingToken);

      if (!book) {
        throw new InvalidTokenException();
      }

      if (book && book.orderId) {
        throw new OrderAlreadyDoneException();
      }

      newOrder.bookingId = book.id;
      booking = book;
    } else if (bookingToken.startsWith('GB_')) {
      const invitedGuest = await this.bookingService.getInvitedGuestByToken(bookingToken);

      if (!invitedGuest) {
        throw new InvalidTokenException();
      }

      if (invitedGuest.accepted !== true) {
        throw new GuestNotAccpetedException();
      }

      if (invitedGuest.orderId) {
        throw new OrderAlreadyDoneException();
      }

      newOrder.bookingId = invitedGuest.bookingId;
      newOrder.invitedGuestId = invitedGuest.id;
      booking = invitedGuest;
    } else {
      throw new InvalidTokenException();
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

    if (this.orderMailer) {
      this.orderMailer.sendOrderEmail(booking, newOrder!, this.getTotalPrice(newOrder!));
    }

    return newOrder!;
  }

  private getTotalPrice(order: Order): number {
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
}
