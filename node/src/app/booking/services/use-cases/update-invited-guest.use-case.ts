import { Injectable, Optional } from '@nestjs/common';
import * as moment from 'moment';
import { InvalidTokenException } from '../../../shared/exceptions/invalid-token.exception';
import { AlreadyAcceptedException } from '../../exceptions/already-accepted.exception';
import { InvalidCancelationTimeException } from '../../exceptions/invalid-cancelation-time.exception';
import { InvitedGuestRepository } from '../../repositories/invited-guest.repository';
import { BookingMailerUseCase } from './booking-mailer.use-case';
import { GetTableUseCase } from './get-table.use-case';
import { BookingRepository } from '../../repositories/booking.repository';

/**
 *
 * US: handle invite
 *
 * As an invited guest I would like to receive an email - after somebody as invited me - with the option to accept or decline the invite so that the system knows about my participation
 * AC:
 *     the mail contains the following information about the invite
 *         who has invited
 *         who else is invited
 *         date and time of the invite
 *         button to accept or decline
 *         after pressing the buttons the system will store the status (yes/no) of my invite
 * US: revoke accepted invite
 * As an invited guest I would like to revoke my previous answer in order to inform the system and the inviter about my no showup
 * AC:
 *     the inviter and myself receives an email about my cancellation
 *     the system sets my status of my invite to no
 *     in case I have placed an order, the order is also removed from the system.
 *     the cancellation is only possible 10 minutes before the event takes place. The system shows a message that cancellation is not possible anymore.
 *
 * @export
 * @class UpdateInvitedGuestUseCase
 */
@Injectable()
export class UpdateInvitedGuestUseCase {
  constructor(
    private readonly invitedGuestRepository: InvitedGuestRepository,
    private readonly getTableUc: GetTableUseCase,
    private readonly bookingRepository: BookingRepository,
    @Optional() private readonly bookingMailerService?: BookingMailerUseCase,
  ) {}

  /**
   * Update the InvitedGuest acepted status
   * @param token invited guest token
   * @param accepted new accepted status
   */
  async updateInvitedGuest(token: string, accepted: boolean): Promise<void> {
    // Find the invited guest
    const invitedGuest = await this.invitedGuestRepository.findOne({
      relations: ['booking'],
      where: { guestToken: token },
    });

    // Validate some conditions.
    if (!invitedGuest) {
      throw new InvalidTokenException();
    }

    if (invitedGuest.accepted === false || invitedGuest.accepted === accepted) {
      throw new AlreadyAcceptedException();
    }

    const now = moment();
    const bookingDate = moment(invitedGuest.booking!.bookingDate).subtract(10, 'minutes');
    if (now.isAfter(bookingDate)) {
      throw new InvalidCancelationTimeException();
    }

    // Update the invited guest accepted status
    invitedGuest.accepted = accepted;
    await this.invitedGuestRepository.save(invitedGuest);

    // If now is after the expiration gate, assign a free table.
    const expirationDate = moment(invitedGuest.booking!.expirationDate);
    if (now.isAfter(expirationDate)) {
      invitedGuest.booking!.tableId = await this.getTableUc.getFreeTable(
        invitedGuest.booking!.bookingDate,
        await this.invitedGuestRepository.getAcceptedAssistantsByBookingToken(invitedGuest.booking!.bookingToken!),
      );

      await this.bookingRepository.save(invitedGuest.booking!);
    }

    // Send the emails
    if (this.bookingMailerService) {
      if (accepted) {
        this.bookingMailerService.sendAcceptedEmails(invitedGuest, accepted);
      } else {
        this.bookingMailerService.sendRejectedEmails(invitedGuest, accepted);
      }
    }
  }
}
