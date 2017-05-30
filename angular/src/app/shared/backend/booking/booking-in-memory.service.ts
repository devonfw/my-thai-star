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
        bookTable.creationDate = moment().format('LLL');
        bookTable.bookingId = maxBy(bookedTables, (table: ReservationView) => table.bookingId).bookingId + 1;
        bookTable.tableId = maxBy(bookedTables, (table: ReservationView) => table.tableId).tableId + 1;
        if (!bookTable.invitedGuests) {
            bookTable.invitedGuests = [];
        }
        return Observable.of(bookedTables.push(bookTable));
    }

    getBookingOrders(filters: FilterCockpit): Observable<OrderListView[]> {
        return Observable.of(filter(orderList, (order: OrderListView) => {
            if (filters.bookingDate) {
                return order.booking.bookingDate.toLowerCase().includes(filters.bookingDate.toLowerCase());
            } else {
                return true;
            }
        }).filter((order: OrderListView) => {
            if (filters.email) {
                return order.booking.email.toLowerCase().includes(filters.email.toLowerCase());
            } else {
                return true;
            }
        }).filter((order: OrderListView) => {
            if (filters.bookingToken) {
                return toString(order.bookingId).includes(toString(filters.bookingToken));
            } else {
                return true;
            }
        }));
    }

    getReservations(filters: FilterCockpit): Observable<ReservationView[]> {
        return Observable.of(filter(bookedTables, (booking: ReservationView) => {
            if (filters.bookingDate) {
                return booking.bookingDate.toLowerCase().includes(filters.bookingDate.toLowerCase());
            } else {
                return true;
            }
        }).filter((booking: ReservationView) => {
            if (filters.email) {
                return booking.email.toLowerCase().includes(filters.email.toLowerCase());
            } else {
                return true;
            }
        }).filter((booking: ReservationView) => {
            if (filters.bookingToken) {
                return toString(booking.bookingId).includes(toString(filters.bookingToken));
            } else {
                return true;
            }
        }));
    }

    saveOrders(order: OrderListInfo): Observable<number> {
        return Observable.of(orderList.push(this.composeOrderList(order)));
    }

    findExtraById(id: number): ExtraView {
        return find(extras, (extra: ExtraView) => extra.id === id);
    }

    findDishById(id: number): DishView {
        return find(dishes, (plate: DishView) => plate.dish.id === id);
    }

    findReservationById(id: {bookingToken: string}): ReservationView {
        return find(bookedTables, (booking: ReservationView) => booking.bookingId === toNumber(id.bookingToken));
    }

    composeOrderList(orders: OrderListInfo): OrderListView {
        let composedOrders: OrderListView;
        let orderList: any = [];
        orders.orderLines.forEach((order: OrderInfo) => {
            let plate: DishView = this.findDishById(order.orderLine.idDish);
            let extras: ExtraView[] = [];
            order.extras.forEach( (extraId: number) => {
                extras.push(this.findExtraById(extraId));
            });
            orderList.push({
                    idDish: order.orderLine.idDish,
                    name: plate.dish.name,
                    price: plate.dish.price,
                    comment: order.orderLine.comment,
                    amount: order.orderLine.amount,
                    extras: extras,
            });
        });

        let bookedTable: ReservationView = this.findReservationById(orders.booking);

        return {
            bookingId: toNumber(orders.booking.bookingToken),
            booking: {
                name: bookedTable.name,
                bookingDate: bookedTable.bookingDate,
                creationDate: bookedTable.creationDate,
                email: bookedTable.email,
                tableId: bookedTable.tableId,
            },
            orderList: orderList,
        };
    }

}
