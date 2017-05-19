import { OrderList } from './orderList';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IBookingDataService } from './booking-data-service-interface';
import { BookingInfo } from './bookingInfo';
import { bookedTables } from '../mock-data';
import * as _ from 'lodash';

@Injectable()
export class BookingInMemoryService implements IBookingDataService {

    getBookingId(): Observable<number> {
        return Observable.of(_.maxBy(bookedTables, (table: BookingInfo) => { return table.bookingId; }).bookingId + 1);
    }

    bookTable(booking: BookingInfo): Observable<number> {
        return Observable.of(bookedTables.push(booking));
    }

    getOrders(): Observable<BookingInfo[]> {
        return Observable.of(bookedTables);
    }

    getOrder(id: number): Observable<BookingInfo> {
        return Observable.of(_.find(bookedTables, (booking: BookingInfo) => { return booking.bookingId === id; }));
    }

    getReservations(): Observable<BookingInfo[]> {
        return Observable.of(_.filter(bookedTables, (booking: BookingInfo) => { return booking.friends.length > 0; }));
    }

    getReservation(id: number): Observable<BookingInfo> {
        return Observable.of(_.find(bookedTables, (booking: BookingInfo) => { return booking.bookingId === id; }));
    }

    saveOrders(orders: OrderList): Observable<number> {
        let tableBooked: BookingInfo = _.find(bookedTables, (booking: BookingInfo) => { return booking.bookingId === orders.bookingId; });
        if (tableBooked) {
            tableBooked.orders.push.apply(tableBooked.orders, orders.orders);
            return Observable.of(1);
        }
        return Observable.of(0);
    }

}
