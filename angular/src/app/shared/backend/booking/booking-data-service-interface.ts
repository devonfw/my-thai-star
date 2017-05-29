import { Observable } from 'rxjs/Observable';
import { ReservationView, OrderListView } from '../../viewModels/interfaces';
import { BookingInfo, FilterCockpit, OrderListInfo } from '../backendModels/interfaces';

export interface IBookingDataService {

    getBookingId(): Observable<number>;
    getBookingOrders(filter: FilterCockpit): Observable<OrderListView[]>;
    getBookingOrder(id: number): Observable<ReservationView>;
    getReservation(id: number): Observable<ReservationView>;
    getReservations(filter: FilterCockpit): Observable<ReservationView[]>;
    bookTable(booking: BookingInfo): Observable<number>;
    saveOrders(orders: OrderListInfo): Observable<ReservationView>;

}
