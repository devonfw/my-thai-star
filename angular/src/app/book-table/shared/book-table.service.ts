import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FriendsInvite, ReservationView } from '../../shared/viewModels/interfaces';
import { BookingDataService } from '../../shared/backend/booking/booking-data-service';
import { BookingInfo, ReservationInfo } from '../../shared/backend/backendModels/interfaces';
import { map, assign } from 'lodash';

@Injectable()
export class BookTableService {

  constructor(private bookingDataService: BookingDataService) {
  }

  postBookingTable(bookInfo: BookingInfo): Observable<any> {
    return this.bookingDataService.bookTable(bookInfo);
  }

  postInvitationTable(invitationInfo: BookingInfo): Observable<any> {
    return this.bookingDataService.bookTable(invitationInfo);
  }

  composeReservation( bookingData: ReservationView): BookingInfo {
    let bookTable: ReservationInfo;
    bookTable = assign(bookTable, bookingData);
    bookTable.bookingType = 0;
    return { booking: bookTable };
  }

  composeInvitation(invitationData: ReservationView): BookingInfo {
    let guests: any = [];
    invitationData.invitedGuests.forEach((guest: FriendsInvite) => {guests.push({email: guest}); });

    return {
      booking: {
        bookingDate: invitationData.bookingDate,
        name: invitationData.name,
        email: invitationData.email,
        bookingType: 1,
      },
      invitedGuests: guests,
    };
  }

}
