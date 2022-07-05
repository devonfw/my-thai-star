import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingInfo } from 'app/shared/backend-models/interfaces';
import { map } from 'lodash';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { ConfigService } from '../../core/config/config.service';
import { BookingResponse } from '../models/booking-response.model';
import { Booking } from '../models/booking.model';

@Injectable()
export class BookTableService {
  private readonly booktableRestPath: string = 'bookingmanagement/v1/booking';

  private readonly restServiceRoot$: Observable<
    string
  > = this.config.getRestServiceRoot();

  constructor(private http: HttpClient, private config: ConfigService) {}

  postBooking(bookInfo: BookingInfo): Observable<BookingResponse> {
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.post<BookingResponse>(`${restServiceRoot}${this.booktableRestPath}`, bookInfo),
      ),
    );
  }

  composeBooking(invitationData: any, type: number): Booking {
    const composedBooking: Booking = {
      booking: {
        bookingDate: invitationData.bookingDate,
        name: invitationData.name,
        email: invitationData.email,
        bookingType: type,
      },
    };

    if (type) {
      composedBooking.invitedGuests = map(
        invitationData.invitedGuests,
        (email: string) => ({ email }),
      );
    } else {
      composedBooking.booking.assistants = invitationData.assistants;
    }

    return composedBooking;
  }
}
