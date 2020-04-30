import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../repositories/order.repository';
import { Booking } from '../../../booking/model/entities/booking.entity';
import { InvitedGuest } from '../../../booking/model/entities/invited-guest.entity';
import { WrongIdException } from '../../exceptions/wrong-id.exception';
import { BookingService } from '../../../booking/services/booking.service';

@Injectable()
export class DeleteOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository, private readonly bookingService: BookingService) {}

  async deleteOrder(orderId: number): Promise<void> {
    const order = await this.orderRepository.findOne(orderId);
    let booking: Booking | InvitedGuest | undefined;

    if (!order) {
      throw new WrongIdException();
    }

    if (order.invitedGuestId) {
      booking = await this.bookingService.getInvitedGuestById(order.invitedGuestId);
    } else {
      booking = await this.bookingService.getBookingById(order.bookingId);
    }

    if (!booking) {
      throw new WrongIdException();
    }

    await this.orderRepository.deleteCascadeOrder(order.id);
  }
}
