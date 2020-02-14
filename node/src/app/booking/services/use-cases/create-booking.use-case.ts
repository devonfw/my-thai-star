import { Injectable, Optional } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '../../../core/user/model/entities/user.entity';
import { NoFreeTablesException } from '../../exceptions/no-free-tables.exception';
import { BookingTypes } from '../../model/booking-types';
import { Booking } from '../../model/entities/booking.entity';
import { InvitedGuest } from '../../model/entities/invited-guest.entity';
import { BookingRepository } from '../../repositories/booking.repository';
import { InvitedGuestRepository } from '../../repositories/invited-guest.repository';
import { BookingMailerUseCase } from './booking-mailer.use-case';
import { GetTableUseCase } from './get-table.use-case';
import { InvalidBookingException } from '../../exceptions/invalid-booking.exception';

/**
 * US: create invite for friends
 * Epic: Invite friends
 * As a guest I want to create an dinner event by entering date and time and adding potential guests by their emails so that each potential guests receives a email in order to confirm or decline my invite.
 * Acceptance criteria
 *     only date and time in future possible and both required
 *     only valid email addresses: text@text.xx, one entered email-address is required
 *     if AGB are not checked, an error message is shown
 *     after the invite is done
 *         I see the confirmation screen of my invite (see wireframe)
 *         I receive a confirmation email about my invite containing date, time and invited guests
 *         all guests receive a mail with my invite
 * US: create reservation
 * Epic: Invite friends
 * As a guest I want to create a reservation by entering date and time and number of adults and kids
 * Acceptance criteria
 *     only date and time in future possible and both required
 *     only valid email addresses: text@text.xx, one entered email-address is required
 *     if AGB are not checked, an error message is shown
 *     after the reservation is done
 *         I see a confirmation screen of my reservation with datetime, number of persons and kids
 *         I receive a confirmation email about my reservation
 *
 * @export
 * @class CreateBookingUseCase
 */
@Injectable()
export class CreateBookingUseCase {
  constructor(
    private readonly connection: Connection,
    private readonly getTableUc: GetTableUseCase,
    @Optional() private readonly bookingMailerService?: BookingMailerUseCase,
  ) {}

  async createBooking(booking: Booking, invitedGuests?: InvitedGuest[], user?: User): Promise<Booking> {
    return await this.connection.transaction(async entityManager => {
      let newBooking = Booking.create(booking);

      if (newBooking.bookingType === BookingTypes.COMMON && invitedGuests?.length) {
        throw new InvalidBookingException();
      }

      // if it is a regular booking (without invited guest) the table must be assigned at this moment
      if (newBooking.bookingType === BookingTypes.COMMON) {
        const tableId = await this.getTableUc.getFreeTable(newBooking.bookingDate, newBooking.assistants!);

        if (!tableId) {
          throw new NoFreeTablesException();
        }

        newBooking.tableId = tableId;
      }

      if (user && user.id) {
        newBooking.userId = user.id;
      }

      newBooking = await entityManager.getCustomRepository(BookingRepository).save(newBooking);

      if (newBooking.bookingType === BookingTypes.INVITED && invitedGuests) {
        const invited: InvitedGuest[] = invitedGuests.map(guest =>
          InvitedGuest.create({ ...guest, bookingId: newBooking.id }),
        );

        newBooking.invitedGuests = await entityManager.getCustomRepository(InvitedGuestRepository).save(invited);
      }

      if (this.bookingMailerService) {
        this.bookingMailerService.sendNewEventEmails(newBooking);
      }

      return newBooking;
    });
  }
}
