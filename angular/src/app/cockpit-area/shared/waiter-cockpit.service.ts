import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import { BookingResponse, OrderResponse, OrderView, OrderViewResult } from '../../shared/viewModels/interfaces';
import { map, cloneDeep } from 'lodash';
import { Pageable, Sort, FilterCockpit } from 'app/shared/backendModels/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class WaiterCockpitService {

  private readonly getReservationsRestPath: string = 'bookingmanagement/v1/booking/search';
  private readonly getOrdersRestPath: string = 'ordermanagement/v1/order/search';
  private readonly filterOrdersRestPath: string = 'ordermanagement/v1/order/search';

  constructor(private http: HttpClient,
              private priceCalculator: PriceCalculatorService) { }

  getOrders(pageable: Pageable, sorting: Sort[], filters: FilterCockpit): Observable<OrderResponse[]> {
    let path: string;
    filters.pageable = pageable;
    filters.pageable.sort = sorting;
    if (filters.email || filters.bookingToken) {
      path = this.filterOrdersRestPath;
    } else {
      delete filters.email;
      delete filters.bookingToken;
      path = this.getOrdersRestPath;
    }
    return this.http.post<OrderResponse[]>(`${environment.restServiceRoot}${path}`, filters);
  }

  getReservations(pageable: Pageable, sorting: Sort[], filters: FilterCockpit): Observable<BookingResponse[]> {
    filters.pageable = pageable;
    filters.pageable.sort = sorting;
    return this.http.post<BookingResponse[]>(`${environment.restServiceRoot}${this.getReservationsRestPath}`, filters);
  }

  orderComposer(orderList: OrderView[]): OrderView[] {
    let orders: OrderView[] = cloneDeep(orderList);
    map(orders, (o: OrderViewResult) => {
      o.dish.price = this.priceCalculator.getPrice(o);
      o.extras = map(o.extras, 'name').join(', ');
    });
    return orders;
  }

  getTotalPrice(orderLines: OrderView[]): number {
    return this.priceCalculator.getTotalPrice(orderLines);
  }

}
