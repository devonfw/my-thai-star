import { Injectable } from '@nestjs/common';
import { User } from '../../core/user/model/entities/user.entity';
import { WinstonLogger } from '../../shared/logger/winston.logger';
import { BookingSearch } from '../model/dto/booking-search.dto';
import { Booking } from '../model/entities/booking.entity';
import { InvitedGuest } from '../model/entities/invited-guest.entity';
import { BookingRepository } from '../repositories/booking.repository';
import { InvitedGuestRepository } from '../repositories/invited-guest.repository';
import { CancelBookingUseCase } from './use-cases/cancel-booking.use-case';
import { CreateBookingUseCase } from './use-cases/create-booking.use-case';
import { UpdateInvitedGuestUseCase } from './use-cases/update-invited-guest.use-case';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly invitedGuestRepository: InvitedGuestRepository,
    private readonly logger: WinstonLogger,
    private readonly createBookingUc: CreateBookingUseCase,
    private readonly cancelBookingUc: CancelBookingUseCase,
    private readonly updateInvitedGuestUc: UpdateInvitedGuestUseCase,
  ) {}

  /**
   * Return the booking that match with the token if exists, otherwise returns undefined.
   * The booking will not include any relation.
   * @param token the booking token
   */
  getBookingByToken(token: string): Promise<Booking | undefined> {
    this.logger.debug('Executing getBookingByToken. Params: token=' + token, 'BookingService');
    return this.bookingRepository.findOne({
      where: {
        bookingToken: token,
      },
    });
  }

  /**
   * Return the invisted guest that match with the token if exists, otherwise returns undefined.
   * The invisted guest will not include any relation.
   * @param token the invited guest token
   */
  getInvitedGuestByToken(token: string): Promise<InvitedGuest | undefined> {
    this.logger.debug('Executing getInvitedGuestByToken. Params: token=' + token, 'BookingService');
    return this.invitedGuestRepository.findOne({
      where: {
        guestToken: token,
      },
    });
  }

  /**
   * Return the booking that match with the provided id
   * @param id the id
   */
  getBookingById(id: number | string): Promise<Booking | undefined> {
    this.logger.debug('Executing getBookingById. Params: id=' + id, 'BookingService');
    return this.bookingRepository.findOne(id);
  }

  /**
   * Return the invited guest that match with the provided id
   * @param id the id
   */
  getInvitedGuestById(id: number | string): Promise<InvitedGuest | undefined> {
    this.logger.debug('Executing getInvitedGuestById. Params: id=' + id, 'BookingService');
    return this.invitedGuestRepository.findOne(id);
  }

  /**
   * Create a new booking.
   *
   * @param booking the booking to create
   * @param invitedGuests the invited guest (if any)
   * @param user the user that is creating the bookign
   */
  createBooking(booking: Booking, invitedGuests?: InvitedGuest[], user?: User): Promise<Booking> {
    this.logger.debug(
      `Executing createBooking. Params: booking=${booking}, invitedGuest=${invitedGuests}, user=${user}`,
      'BookingService',
    );
    return this.createBookingUc.createBooking(booking, invitedGuests, user);
  }

  /**
   * Search booking based in a search criteria
   *
   * @param search the search criteria
   */
  async searchBooking(search: BookingSearch): Promise<[Booking[], number]> {
    this.logger.debug(`Executing searchBooking. Params: search=${search}`, 'BookingService');
    return this.bookingRepository.searchBookingByCriteria(search);
  }

  /**
   * Update the InvitedGuest acepted status
   * @param token invited guest token
   * @param accepted new accepted status
   */
  updateInvitedGuest(token: string, accepted: boolean): Promise<void> {
    this.logger.debug(`Executing updateInvitedGuest. Params: token=${token}, accepted=${accepted}`, 'BookingService');
    return this.updateInvitedGuestUc.updateInvitedGuest(token, accepted);
  }

  /**
   * Cancel booking
   * @param token booking token
   */
  cancelBooking(token: string): Promise<void> {
    this.logger.debug(`Executing cancelBooking. Params: token=${token}`, 'BookingService');
    return this.cancelBookingUc.cancelBooking(token);
  }
}
