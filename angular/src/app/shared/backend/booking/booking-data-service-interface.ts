import { Observable } from 'rxjs/Observable';
import { BookingInfo } from './bookingInfo';
import { ReservationInfo } from './reservationInfo';

export interface IBookingDataService {

    getBookingId(): Observable<number>;
    bookTable(booking: BookingInfo): Observable<number>;
    bookTableFriends(reservation: ReservationInfo): Observable<number>;

}
