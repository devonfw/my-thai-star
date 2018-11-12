import { Injectable } from '@nestjs/common';
import { Booking } from 'management/booking/models/booking.entity';

@Injectable()
export class EmailService {
  constructor() {}
  async sendConfirmationEmail(input: Booking) {
    const confirmationEmail: string = `Hi ${input.email},
Your booking has been confirmed.
Host: ${input.name}<${input.email}>
Booking CODE: ${input.bookingToken}
Booking Date: ${input.bookingDate}
To cancel navigate to the followin url: http://localhost:4200/booking/cancel/${
      input.bookingToken
    }`;
    // tslint:disable:no-console
    console.log(confirmationEmail);
    // tslint:enable:no-console
  }
}
