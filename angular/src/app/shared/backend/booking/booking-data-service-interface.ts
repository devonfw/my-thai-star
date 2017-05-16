import { Observable } from 'rxjs/Observable';
import { BookingInfo } from './bookingInfo';
import { ReservationInfo } from './reservationInfo';

export interface IBookingDataService {

    getBookingId(): Observable<number>;
    getOrders(): Observable<BookingInfo[]>;
    getReservations(): Observable<BookingInfo[]>;
    bookTable(booking: BookingInfo): Observable<number>;

}
