import { OrderList } from './orderList';
import { Observable } from 'rxjs/Observable';
import { BookingInfo } from './bookingInfo';

export interface IBookingDataService {

    getBookingId(): Observable<number>;
    getOrders(): Observable<BookingInfo[]>;
    getOrder(id: number): Observable<BookingInfo>;
    getReservations(): Observable<BookingInfo[]>;
    getReservation(id: number): Observable<BookingInfo>;
    bookTable(booking: BookingInfo): Observable<number>;
    saveOrders(orders: OrderList): Observable<number>;

}
