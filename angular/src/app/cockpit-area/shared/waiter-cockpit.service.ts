import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import {
  BookingResponse,
  OrderResponse,
  OrderView,
  OrderViewResult,
} from '../../shared/view-models/interfaces';
import { map, cloneDeep } from 'lodash';
import {
  Pageable,
  Sort,
  FilterCockpit,
} from 'app/shared/backend-models/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ConfigService } from '../../core/config/config.service';

@Injectable()
export class WaiterCockpitService {
  private readonly getReservationsRestPath: string =
    'bookingmanagement/v1/booking/search';
  private readonly getOrdersRestPath: string =
    'ordermanagement/v1/order/search';
  private readonly filterOrdersRestPath: string =
    'ordermanagement/v1/order/search';

  private readonly restServiceRoot: string;

  constructor(
    private http: HttpClient,
    private priceCalculator: PriceCalculatorService,
    private configService: ConfigService
  ) {

    this.restServiceRoot = this.configService.getValues().restServiceRoot;
  }

  getOrders(
    pageable: Pageable,
    sorting: Sort[],
    filters: FilterCockpit,
  ): Observable<OrderResponse[]> {
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
    return this.http.post<OrderResponse[]>(
      `${this.restServiceRoot}${path}`,
      filters,
    );
  }

  getReservations(
    pageable: Pageable,
    sorting: Sort[],
    filters: FilterCockpit,
  ): Observable<BookingResponse[]> {
    filters.pageable = pageable;
    filters.pageable.sort = sorting;
    return this.http.post<BookingResponse[]>(
      `${this.restServiceRoot}${this.getReservationsRestPath}`,
      filters,
    );
  }

  orderComposer(orderList: OrderView[]): OrderView[] {
    const orders: OrderView[] = cloneDeep(orderList);
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
