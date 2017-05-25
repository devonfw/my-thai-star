import { Observable } from 'rxjs/Observable';
import { ReservationView } from '../../viewModels/interfaces';
import { BookingInfo, FilterCockpit, OrderListInfo } from '../backendModels/interfaces';

export interface IBookingDataService {

    getBookingId(): Observable<number>;
    getBookingOrders(): Observable<ReservationView[]>;
    getBookingOrder(id: number): Observable<ReservationView>;
    filterBookingOrders(filter: FilterCockpit): Observable<ReservationView[]>;
    getReservations(): Observable<ReservationView[]>;
    getReservation(id: number): Observable<ReservationView>;
    filterReservations(filter: FilterCockpit): Observable<ReservationView[]>;
    bookTable(booking: BookingInfo): Observable<number>;
    saveOrders(orders: OrderListInfo): Observable<ReservationView>;

}
