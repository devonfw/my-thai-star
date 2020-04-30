import { MailerService } from '@devon4node/mailer';
import { Injectable } from '@nestjs/common';
import { Booking } from '../../../booking/model/entities/booking.entity';
import { InvitedGuest } from '../../../booking/model/entities/invited-guest.entity';
import { WinstonLogger } from '../../../shared/logger/winston.logger';
import { Order } from '../../model/entities/order.entity';

@Injectable()
export class OrderMailerUseCase {
  // Make this with arrow function in order to bind the logger in the correct moment
  // prettier-ignore
  private logMailError = (reject: Error): void => {
    this.logger.error(reject.message, JSON.stringify(reject));
  }

  constructor(private readonly logger: WinstonLogger, private readonly mailerService: MailerService) {}

  sendOrderEmail(booking: Booking | InvitedGuest, newOrder: Order, price: number): void {
    this.mailerService
      .sendTemplateMail(
        {
          to: booking!.email,
          subject: 'Order confirmation',
        },
        'order',
        {
          booking,
          order: newOrder,
          price,
        },
      )
      .catch(this.logMailError);
  }
}
