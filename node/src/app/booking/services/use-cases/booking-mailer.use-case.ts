import { ConfigService } from '@devon4node/config';
import { MailerService } from '@devon4node/mailer';
import { Injectable } from '@nestjs/common';
import { WinstonLogger } from '../../../shared/logger/winston.logger';
import { Config } from '../../../shared/model/config/config.model';
import { Booking } from '../../model/entities/booking.entity';
import { InvitedGuest } from '../../model/entities/invited-guest.entity';

@Injectable()
export class BookingMailerUseCase {
  // Make this with arrow function in order to bind the logger in the correct moment
  // prettier-ignore
  private logMailError = (reject: Error): void => {
    this.logger.error(reject.message, JSON.stringify(reject));
  }

  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly logger: WinstonLogger,
    private readonly mailer: MailerService,
  ) {}

  sendNewEventEmails(newBooking: Booking): void {
    this.logger.debug('Sending new event emails', JSON.stringify(newBooking));
    this.mailer
      .sendTemplateMail(
        {
          to: newBooking.email,
          subject: 'Booking confirmation',
        },
        'confirmedBooking',
        {
          clientUrl: this.configService.values.clientUrl,
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
            clientUrl: this.configService.values.clientUrl,
            booking: newBooking,
            invitedGuest,
          },
        ).catch(this.logMailError);
      });
    }
  }

  sendRejectedEmails(invitedGuest: InvitedGuest, accepted: boolean): void {
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

  sendAcceptedEmails(invitedGuest: InvitedGuest, accepted: boolean): void {
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

  sendCanceledEmails(booking: Booking, invitedGuests: InvitedGuest[] | undefined): void {
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
