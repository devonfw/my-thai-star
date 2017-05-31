import { any } from 'codelyzer/util/function';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IBookingDataService } from './booking-data-service-interface';
import { ReservationView, DishView, FriendsInvite, OrderView, ExtraView, OrderListView } from '../../viewModels/interfaces';
import { BookingInfo, FilterCockpit, OrderInfo, OrderListInfo } from '../backendModels/interfaces';
import { bookedTables, extras, dishes, orderList } from '../mock-data';
import * as moment from 'moment';
import { assign, maxBy, find, filter, toString, toNumber } from 'lodash';

@Injectable()
export class BookingInMemoryService implements IBookingDataService {

    bookTable(booking: BookingInfo): Observable<number> {
        let bookTable: ReservationView;
        bookTable = assign(bookTable, booking);
        bookTable.booking.creationDate = moment().format('LLL');
        bookTable.booking.bookingToken = maxBy(bookedTables, (table: ReservationView) => table.booking.bookingToken).booking.bookingToken + 1;
        bookTable.booking.tableId = maxBy(bookedTables, (table: ReservationView) => table.booking.tableId).booking.tableId + 1;
        if (!bookTable.invitedGuests) {
            bookTable.invitedGuests = [];
        }
        return Observable.of(bookedTables.push(bookTable));
    }

    getReservations(filters: FilterCockpit): Observable<any> {
        return Observable.of({
            pagination: {
                size: 500,
                page: 1,
                total: 500,
            },
            result: filter(bookedTables, (booking: ReservationView) => {
                        if (filters.bookingDate) {
                            return booking.booking.bookingDate.toLowerCase().includes(filters.bookingDate.toLowerCase());
                        } else {
                            return true;
                        }
                    }).filter((booking: ReservationView) => {
                        if (filters.email) {
                            return booking.booking.email.toLowerCase().includes(filters.email.toLowerCase());
                        } else {
                            return true;
                        }
                    }).filter((booking: ReservationView) => {
                        if (filters.bookingToken) {
                            return toString(booking.booking.bookingToken).includes(toString(filters.bookingToken));
                        } else {
                            return true;
                        }
                    }),
        });
    }

    acceptInvite(token: string): Observable<number> {
        return Observable.of(1);
     }

    cancelInvite(token: string): Observable<number> {
        return Observable.of(1);
     }

    cancelReserve(token: string): Observable<number> {
        return Observable.of(1);
     }

}
