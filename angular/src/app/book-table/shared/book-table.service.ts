import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReservationView } from '../../shared/models/interfaces';
import { BookingDataService } from '../../shared/backend/booking/booking-data-service';

@Injectable()
export class BookTableService {

  constructor(private bookingDataService: BookingDataService) {
  }

  getTableId(): Observable<number> {
    return this.bookingDataService.getBookingId();
  }

  postBookingTable(bookInfo: ReservationView): Observable<any> {
    return this.bookingDataService.bookTable(bookInfo);
  }

  postInvitationTable(invitationInfo: ReservationView): Observable<any> {
    return this.bookingDataService.bookTable(invitationInfo);
  }

}
