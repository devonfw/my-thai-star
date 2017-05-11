import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IBookingDataService } from './booking-data-service-interface';
import { BookingInfo } from './bookingInfo';
import { ReservationInfo } from './reservationInfo';
import * as _ from 'lodash';

@Injectable()
export class BookingInMemoryService implements IBookingDataService {

    getBookingId(): Observable<number> {
        return Observable.of(Math.floor(1000000000 + Math.random() * 9000000000));
    }

    bookTable(booking: BookingInfo): Observable<number> {
        return Observable.of(Math.floor(1000000000 + Math.random() * 9000000000));
    }

    bookTableFriends(reservation: ReservationInfo): Observable<number> {
        return Observable.of(Math.floor(1000000000 + Math.random() * 9000000000));
    }

}
