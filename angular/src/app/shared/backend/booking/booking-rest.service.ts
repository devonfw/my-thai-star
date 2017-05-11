import { Injectable, Injector } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IBookingDataService } from './booking-data-service-interface';
import { BookingInfo } from './bookingInfo';
import { ReservationInfo } from './reservationInfo';
import { config } from '../../../config';

@Injectable()
export class BookingRestService implements IBookingDataService {

     private readonly reservationIdRestPath: string = '/reservationid';
     private readonly booktableRestPath: string = '/booktable';
     private readonly reservetableRestPath: string = '/reservetable';

     private http: Http;

     constructor(private injector: Injector) {
       this.http = this.injector.get(Http);
     }

     getBookingId(): Observable<number> {
       return this.http.get(`${config.restServiceRoot}${this.reservationIdRestPath}`)
                       .map((res: Response) => res.json());
     }

     bookTable(booking: BookingInfo): Observable<number> {
        return this.http.post(`${config.restServiceRoot}${this.booktableRestPath}`, {bookingtable: booking})
                        .map((res: Response) => res.json());
     }

    bookTableFriends(reservation: ReservationInfo): Observable<number> {
        return this.http.post(`${config.restServiceRoot}${this.reservetableRestPath}`, {reservation: reservation})
                        .map((res: Response) => res.json());
     }

}
