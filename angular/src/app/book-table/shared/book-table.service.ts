import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReservationView, InvitationView } from '../../shared/models/interfaces';
import { BookingDataService } from '../../shared/backend/booking/booking-data-service';

@Injectable()
export class BookTableService {

  constructor(private bookingDataService: BookingDataService) {
  }

  getTableId(): Observable<number> {
    return this.bookingDataService.getBookingId();
  }

  postBookingTable(bookInfo: ReservationView): Observable<any> {
    return this.bookingDataService.getBookingId();
  }

  postInvitationTable(invitationInfo: InvitationView): Observable<any> {
    return this.bookingDataService.getBookingId();
  }

}
