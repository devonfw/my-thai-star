import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IBookingDataService } from './booking-data-service-interface';
import { bookedTables } from '../mock-data';
import { maxBy, find, filter } from 'lodash';
import { BookingInfo, OrderList } from '../backendModels/interfaces';
import * as moment from 'moment';

@Injectable()
export class BookingInMemoryService implements IBookingDataService {

    getBookingId(): Observable<number> {
        return Observable.of(maxBy(bookedTables, (table: BookingInfo) => table.bookingId).bookingId + 1);
    }

    bookTable(booking: BookingInfo): Observable<number> {
        booking.creationDateTime = moment().format('LLL');
        booking.tableId = maxBy(bookedTables, (table: BookingInfo) => { return table.tableId; }).tableId + 1;
        return Observable.of(bookedTables.push(booking));
    }

    getOrders(): Observable<BookingInfo[]> {
        return Observable.of(bookedTables);
    }

    getOrder(id: number): Observable<BookingInfo> {
        return Observable.of(find(bookedTables, (booking: BookingInfo) => booking.bookingId === id));
    }

    getReservations(): Observable<BookingInfo[]> {
        return Observable.of(filter(bookedTables, (booking: BookingInfo) => booking.friends.length > 0));
    }

    getReservation(id: number): Observable<BookingInfo> {
        return Observable.of(find(bookedTables, (booking: BookingInfo) => booking.bookingId === id));
    }

    saveOrders(orderList: OrderList): Observable<BookingInfo> {
        const tableBooked: BookingInfo = find(bookedTables, (booking: BookingInfo) => booking.bookingId === orderList.bookingId);
        if (!tableBooked) {
            return Observable.throw(undefined);
        }
        tableBooked.orders = tableBooked.orders.concat(orderList.orders);
        return Observable.of(tableBooked);
    }

}
