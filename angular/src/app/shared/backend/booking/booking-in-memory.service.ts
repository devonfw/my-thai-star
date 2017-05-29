import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IBookingDataService } from './booking-data-service-interface';
import { ReservationView, DishView, FriendsInvite, OrderView, ExtraView, OrderListView } from '../../viewModels/interfaces';
import { BookingInfo, FilterCockpit, OrderInfo, OrderListInfo } from '../backendModels/interfaces';
import { bookedTables, extras, dishes, orderList } from '../mock-data';
import * as moment from 'moment';
import { assign, maxBy, find, filter, toString } from 'lodash';

@Injectable()
export class BookingInMemoryService implements IBookingDataService {

    getBookingId(): Observable<number> {
        return Observable.of(maxBy(bookedTables, (table: ReservationView) => table.bookingId).bookingId + 1);
    }

    bookTable(booking: BookingInfo): Observable<number> {
        let bookTable: ReservationView;
        bookTable = assign(bookTable, booking);
        bookTable.creationDate = moment().format('LLL');
        bookTable.bookingId = maxBy(bookedTables, (table: ReservationView) => table.bookingId).bookingId + 1;
        bookTable.tableId = maxBy(bookedTables, (table: ReservationView) => table.tableId).tableId + 1;
        return Observable.of(bookedTables.push(bookTable));
    }

    getBookingOrder(id: number): Observable<ReservationView> {
        return Observable.of(find(bookedTables, (booking: ReservationView) => booking.bookingId === id));
    }

    getBookingOrders(filters: FilterCockpit): Observable<OrderListView[]> {
        return Observable.of(orderList);
    }

    getReservations(filters: FilterCockpit): Observable<ReservationView[]> {
        return Observable.of(filter(bookedTables, (booking: ReservationView) => {
            if (filters.date) {
                return booking.date.toLowerCase().includes(filters.date.toLowerCase());
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
            if (filters.bookingId) {
                return toString(booking.bookingId).includes(toString(filters.bookingId));
            } else {
                return true;
            }
        }));
    }

    getReservation(id: number): Observable<ReservationView> {
        return Observable.of(find(bookedTables, (booking: ReservationView) => booking.bookingId === id));
    }

    saveOrders(orderList: OrderListInfo): Observable<ReservationView> {
        const tableBooked: ReservationView = find(bookedTables, (booking: ReservationView) => booking.bookingId === orderList.bookingId);
        if (!tableBooked) {
            return Observable.throw(undefined);
        }
        tableBooked.orders = tableBooked.orders.concat(this.composeOrderList(orderList.orders));
        return Observable.of(tableBooked);
    }

    findExtraById(id: number): ExtraView {
        return find(extras, (extra: ExtraView) => extra.id === id);
    }

    findDishById(id: number): DishView {
        return find(dishes, (dish: DishView) => dish.id === id);
    }

    composeOrderList(orders: OrderInfo[]): OrderView[] {
        let composedOrders: OrderView[] = [];
        orders.forEach((order: OrderInfo) => {
            let dish: DishView = this.findDishById(order.orderLine.idDish);
            let extras: ExtraView[] = [];
            order.extras.forEach( (extraId: number) => {
                extras.push(this.findExtraById(extraId));
            });
            composedOrders.push({
                idDish: order.orderLine.idDish,
                name: dish.name,
                price: dish.price,
                comment: order.orderLine.comment,
                amount: order.orderLine.amount,
                extras: extras,
            });
        });
        return composedOrders;
    }

}
