import { Observable } from 'rxjs/Observable';
import { ReservationView } from '../../shared/viewModels/interfaces';
import { BookingInfo, FilterCockpit } from '../backendModels/interfaces';

export interface IBookingDataService {

    getReservations(filter: FilterCockpit): Observable<ReservationView[]>;
    bookTable(booking: BookingInfo): Observable<number>;
    acceptInvite(token: string): Observable<number>;
    cancelInvite(token: string): Observable<number>;
    cancelReserve(token: string): Observable<number>;
}
