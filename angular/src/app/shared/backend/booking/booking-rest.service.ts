import { Injectable, Injector } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IBookingDataService } from './booking-data-service-interface';
import { BookingInfo, FilterCockpit, OrderListInfo } from '../backendModels/interfaces';
import { ReservationView, OrderListView } from '../../viewModels/interfaces';
import { config } from '../../../config';

@Injectable()
export class BookingRestService implements IBookingDataService {

     private readonly booktableRestPath: string = 'bookingmanagement/v1/booking';
     private readonly acceptReserveRestPath: string = 'bookingmanagement/v1/invitedguest/accept/';
     private readonly rejectReserveRestPath: string = 'bookingmanagement/v1/invitedguest/decline/';
     private readonly cancelReserveRestPath: string = 'bookingmanagement/v1/booking/cancel/';
     private readonly getReservationsRestPath: string = 'bookingmanagement/v1/booking/search';

     private http: Http;

     constructor(private injector: Injector) {
       this.http = this.injector.get(Http);
     }

     bookTable(booking: BookingInfo): Observable<number> {
        return this.http.post(`${config.restServiceRoot}${this.booktableRestPath}`, booking)
                        .map((res: Response) => res.json());

     }

     getReservations(filter: FilterCockpit): Observable<ReservationView[]> {
        return this.http.post(`${config.restServiceRoot}${this.getReservationsRestPath}`, filter)
                        .map((res: Response) => res.json());
     }

    acceptInvite(token: string): Observable<number> {
        return this.http.get(`${config.restServiceRoot}${this.acceptReserveRestPath}` + token)
                        .map((res: Response) => res.json());

     }

    cancelInvite(token: string): Observable<number> {
        return this.http.get(`${config.restServiceRoot}${this.rejectReserveRestPath}` + token)
                        .map((res: Response) => res.json());

     }

    cancelReserve(token: string): Observable<number> {
        return this.http.get(`${config.restServiceRoot}${this.cancelReserveRestPath}` + token)
                        .map((res: Response) => res.json());

     }

}
