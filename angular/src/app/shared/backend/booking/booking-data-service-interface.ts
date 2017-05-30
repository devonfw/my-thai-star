import { Observable } from 'rxjs/Observable';
import { ReservationView, OrderListView } from '../../viewModels/interfaces';
import { BookingInfo, FilterCockpit, OrderListInfo } from '../backendModels/interfaces';

export interface IBookingDataService {

    getBookingOrders(filter: FilterCockpit): Observable<OrderListView[]>;
    getReservations(filter: FilterCockpit): Observable<ReservationView[]>;
    bookTable(booking: BookingInfo): Observable<number>;
    saveOrders(orders: OrderListInfo): Observable<number>;
    acceptInvite(token: string): Observable<number>;
    cancelInvite(token: string): Observable<number>;
    cancelReserve(token: string): Observable<number>;
    cancelOrder(token: string): Observable<number>;
}
