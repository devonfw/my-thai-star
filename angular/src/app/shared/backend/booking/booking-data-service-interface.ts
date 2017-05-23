import { BookingInfo, OrderList } from '../backendModels/interfaces';
import { Observable } from 'rxjs/Observable';

export interface IBookingDataService {

    getBookingId(): Observable<number>;
    getOrders(): Observable<BookingInfo[]>;
    getOrder(id: number): Observable<BookingInfo>;
    getReservations(): Observable<BookingInfo[]>;
    getReservation(id: number): Observable<BookingInfo>;
    bookTable(booking: BookingInfo): Observable<number>;
    saveOrders(orders: OrderList): Observable<BookingInfo>;

}
