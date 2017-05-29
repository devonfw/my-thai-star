import { Injectable, Injector } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IBookingDataService } from './booking-data-service-interface';
import { BookingInfo, FilterCockpit, OrderListInfo } from '../backendModels/interfaces';
import { ReservationView, OrderListView } from '../../viewModels/interfaces';
import { config } from '../../../config';

@Injectable()
export class BookingRestService implements IBookingDataService {

     private readonly reservationIdRestPath: string = '/reservationid';
     private readonly booktableRestPath: string = '/booktable';
     private readonly reservetableRestPath: string = '/reservetable';
     private readonly getOrdersRestPath: string = '/getorders';
     private readonly getOrderRestPath: string = '/getorder';
     private readonly filtersOrdersRestPath: string = '/filterorders';
     private readonly getReservationsRestPath: string = '/getreservations';
     private readonly getReservationRestPath: string = '/getreservation';
     private readonly filterReservationRestPath: string = '/filterreservation';
     private readonly saveOrdersPath: string = '/saveorders';

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

      getBookingOrder(id: number): Observable<ReservationView> {
        return this.http.get(`${config.restServiceRoot}${this.getOrderRestPath}`)
              .map((res: Response) => res.json());
     }

      getBookingOrders(filter: FilterCockpit): Observable<OrderListView[]> {
        return this.http.get(`${config.restServiceRoot}${this.filtersOrdersRestPath}`)
                        .map((res: Response) => res.json());
     }

     getReservation(id: number): Observable<ReservationView> {
        return this.http.get(`${config.restServiceRoot}${this.getReservationRestPath}`)
                        .map((res: Response) => res.json());
     }

     getReservations(filter: FilterCockpit): Observable<ReservationView[]> {
        return this.http.get(`${config.restServiceRoot}${this.filterReservationRestPath}`)
                        .map((res: Response) => res.json());
     }

    saveOrders(orders: OrderListInfo): Observable<number> {
        return this.http.post(`${config.restServiceRoot}${this.saveOrdersPath}`, {orders: orders})
                        .map((res: Response) => res.json());
    }

}
