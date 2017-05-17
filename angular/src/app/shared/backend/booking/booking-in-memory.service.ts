import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IBookingDataService } from './booking-data-service-interface';
import { BookingInfo } from './bookingInfo';
import { bookedTables } from '../mock-data';
import * as _ from 'lodash';

@Injectable()
export class BookingInMemoryService implements IBookingDataService {

    getBookingId(): Observable<number> {
        return Observable.of(bookedTables[bookedTables.length - 1].reservationId + 1);
    }

    bookTable(booking: BookingInfo): Observable<number> {
        return Observable.of(bookedTables.push(booking));
    }

    getOrders(): Observable<BookingInfo[]> {
        return Observable.of(bookedTables);
    }

    getOrder(id: number): Observable<BookingInfo> {
        return Observable.of(_.find(bookedTables, (booking: BookingInfo) => { return booking.reservationId === id; }));
    }

    getReservations(): Observable<BookingInfo[]> {
        return Observable.of(_.filter(bookedTables, (booking: BookingInfo) => { return booking.friends.length > 0; }));
    }

    getReservation(id: number): Observable<BookingInfo> {
        return Observable.of(_.find(bookedTables, (booking: BookingInfo) => { return booking.reservationId === id; }));
    }

}
