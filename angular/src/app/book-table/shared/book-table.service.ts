import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FriendsInvite, ReservationView } from '../../shared/viewModels/interfaces';
import { BookingDataService } from '../../shared/backend/booking/booking-data-service';
import { BookingInfo } from '../../shared/backend/backendModels/interfaces';
import { map } from 'lodash';

@Injectable()
export class BookTableService {

  constructor(private bookingDataService: BookingDataService) {
  }

  getTableId(): Observable<number> {
    return this.bookingDataService.getBookingId();
  }

  postBookingTable(bookInfo: BookingInfo): Observable<any> {
    return this.bookingDataService.bookTable(bookInfo);
  }

  postInvitationTable(invitationInfo: BookingInfo): Observable<any> {
    return this.bookingDataService.bookTable(invitationInfo);
  }

  composeInvitation(invitationData: ReservationView): BookingInfo {
    let guests: any = [];
    invitationData.guestList.forEach((guest: FriendsInvite) => {guests.push({email: guest}); });

    return {
      date: invitationData.date,
      name: invitationData.name,
      email: invitationData.email,
      bookingType: 1,
      guestList: guests,
      orders: [],
    };
  }

}
