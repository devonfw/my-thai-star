import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'lodash';
import { BookingInfo } from 'app/shared/backendModels/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class BookTableService {

  private readonly booktableRestPath: string = 'bookingmanagement/v1/booking';

  constructor(private http: HttpClient) {
  }

  postBooking(bookInfo: BookingInfo): Observable<any> {
    return this.http.post(`${environment.restServiceRoot}${this.booktableRestPath}`, bookInfo);
  }

  composeBooking(invitationData: any, type: number): BookingInfo {
    let composedBooking: BookingInfo = {
      booking: {
        bookingDate: invitationData.bookingDate,
        name: invitationData.name,
        email: invitationData.email,
        bookingType: type,
      },
    };

    if (type) {
      composedBooking.invitedGuests = map(invitationData.invitedGuests, (email: string) => { return { email: email }; });
    } else {
      composedBooking.booking.assistants = invitationData.assistants;
    }

    return composedBooking;
  }

}
