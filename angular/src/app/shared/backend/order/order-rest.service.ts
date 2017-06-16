import { environment } from './../../../../environments/environment';
import { Injectable, Injector } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IOrderDataService } from './order-data-service-interface';
import { FilterCockpit, OrderListInfo } from '../backendModels/interfaces';
import { OrderListView } from '../../viewModels/interfaces';
import { config } from '../../../config';
import { HttpClient } from '../../httpClient/httpClient.service';

@Injectable()
export class OrderRestService implements IOrderDataService {

     private readonly getOrdersRestPath: string = 'ordermanagement/v1/order/search';
     private readonly filterOrdersRestPath: string = 'ordermanagement/v1/order/filter';
     private readonly cancelOrderRestPath: string = 'ordermanagement/v1/order/cancelorder/';
     private readonly saveOrdersPath: string = 'ordermanagement/v1/order';

     private http: HttpClient;

     constructor(private injector: Injector) {
       this.http = this.injector.get(HttpClient);
     }

     getBookingOrders(filter: FilterCockpit): Observable<OrderListView[]> {
        let path: string;
        if (filter.email || filter.bookingToken) {
          path = this.filterOrdersRestPath;
        } else {
          delete filter.email;
          delete filter.bookingToken;
          path = this.getOrdersRestPath;
        }
        return this.http.post(`${config.restServiceRoot}${path}`, filter)
                        .map((res: Response) => res.json());
     }

     saveOrders(orders: OrderListInfo): Observable<number> {
        return this.http.post(`${config.restServiceRoot}${this.saveOrdersPath}`, orders)
                        .map((res: Response) => res.json());
     }

    cancelOrder(token: string): Observable<number> {
        return this.http.get(`${config.restServiceRoot}${this.cancelOrderRestPath}` + token)
                        .map((res: Response) => res.json());

    }

}
