import { Injectable, Optional } from '@nestjs/common';
import * as moment from 'moment';
import { InvalidTokenException } from '../../../shared/exceptions/invalid-token.exception';
import { InvalidCancelationTimeException } from '../../exceptions/invalid-cancelation-time.exception';
import { BookingRepository } from '../../repositories/booking.repository';
import { BookingMailerUseCase } from './booking-mailer.use-case';

@Injectable()
export class CancelBookingUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository,
    @Optional() private readonly bookingMailerService?: BookingMailerUseCase,
  ) {}

  /**
   * Cancel booking
   * @param token booking token
   */
  async cancelBooking(token: string): Promise<void> {
    // Find the booking by token
    const booking = await this.bookingRepository.findOne({
      where: { bookingToken: token },
      relations: ['invitedGuests'],
    });

    // Validate some conditions
    if (!booking) {
      throw new InvalidTokenException();
    }

    const now = moment();
    const expirationDate = moment(booking.expirationDate);
    if (now.isAfter(expirationDate)) {
      throw new InvalidCancelationTimeException();
    }

    // Delete all invited guest and the booking
    await this.bookingRepository.deleteCascadeBooking(booking);

    // Send the emails
    if (this.bookingMailerService) {
      this.bookingMailerService.sendCanceledEmails(booking, booking.invitedGuests);
    }
  }
}
