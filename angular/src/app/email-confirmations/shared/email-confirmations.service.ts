import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OrderDataService } from '../../backend/order/order-data-service';
import { BookingDataService } from '../../backend/booking/booking-data-service';

@Injectable()
export class EmailConfirmationsService {

  constructor(private orderDataService: OrderDataService,
              private bookingDataService: BookingDataService) { }

  sendAcceptInvitation(token: string): Observable<number> {
    return this.bookingDataService.acceptInvite(token);
  }

  sendRejectInvitation(token: string): Observable<number> {
    return this.bookingDataService.cancelInvite(token);
  }

  sendCancelBooking(token: string): Observable<number> {
    return this.bookingDataService.cancelReserve(token);
  }

  sendCancelOrder(token: string): Observable<number> {
    return this.orderDataService.cancelOrder(token);
  }
}
