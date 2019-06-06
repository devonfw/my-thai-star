import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'lodash';
import { BookingInfo } from 'app/shared/backend-models/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ConfigService } from '../../core/config/config.service';

@Injectable()
export class BookTableService {

  private readonly booktableRestPath: string = 'bookingmanagement/v1/booking';

  private readonly restServiceRoot: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.restServiceRoot = this.configService.getValues().restServiceRoot;
  }

  postBooking(bookInfo: BookingInfo): Observable<any> {
    return this.http.post(`${this.restServiceRoot}${this.booktableRestPath}`, bookInfo);
  }

  composeBooking(invitationData: any, type: number): BookingInfo {
    const composedBooking: BookingInfo = {
      booking: {
        bookingDate: invitationData.bookingDate,
        name: invitationData.name,
        email: invitationData.email,
        bookingType: type,
      },
    };

    if (type) {
      composedBooking.invitedGuests = map(invitationData.invitedGuests, (email: string) => ({ email: email }));
    } else {
      composedBooking.booking.assistants = invitationData.assistants;
    }

    return composedBooking;
  }

}
