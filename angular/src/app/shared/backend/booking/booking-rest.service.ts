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
     private readonly getOrdersRestPath: string = 'ordermanagement/v1/order/search';
     private readonly getReservationsRestPath: string = 'bookingmanagement/v1/booking/search';
     private readonly saveOrdersPath: string = 'ordermanagement/v1/order';

     private http: Http;

     constructor(private injector: Injector) {
       this.http = this.injector.get(Http);
     }

     bookTable(booking: BookingInfo): Observable<number> {
        return this.http.post(`${config.restServiceRoot}${this.booktableRestPath}`, booking)
                        .map((res: Response) => res.json());
     }

     getBookingOrders(filter: FilterCockpit): Observable<OrderListView[]> {
        return this.http.post(`${config.restServiceRoot}${this.getOrdersRestPath}`, filter)
                        .map((res: Response) => res.json().result);
     }

     getReservations(filter: FilterCockpit): Observable<ReservationView[]> {
        return this.http.post(`${config.restServiceRoot}${this.getReservationsRestPath}`, filter)
                        .map((res: Response) => res.json().result);
     }

     saveOrders(orders: OrderListInfo): Observable<number> {
        return this.http.post(`${config.restServiceRoot}${this.saveOrdersPath}`, {orders: orders})
                        .map((res: Response) => res.json());
     }

}
