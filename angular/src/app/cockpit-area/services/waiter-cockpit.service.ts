import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FilterCockpit,
  Pageable,
  Sort,
} from 'app/shared/backend-models/interfaces';
import { cloneDeep, map } from 'lodash';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { ConfigService } from '../../core/config/config.service';
import {
  BookingResponse,
  BookingView,
  OrderResponse,
  OrderView,
  OrderViewResult,
  SaveOrderResponse,
} from '../../shared/view-models/interfaces';
import { PriceCalculatorService } from '../../sidenav/services/price-calculator.service';

@Injectable()
export class WaiterCockpitService {
  private readonly getReservationsRestPath: string =
    'bookingmanagement/v1/booking/search';
    private readonly updateTableNumber: string =
    'bookingmanagement/v1/booking/updateTable';
  private readonly getOrdersRestPath: string =
    'ordermanagement/v1/order/search';
  private readonly filterOrdersRestPath: string =
    'ordermanagement/v1/order/search';
  private readonly updateOrderRestPath: string =
    'ordermanagement/v1/order/updatestate';
  private readonly updateOrderPayStatePath: string =
    'ordermanagement/v1/order/updatepaystate';
    
  private readonly restServiceRoot$: Observable<string> = this.config.getRestServiceRoot();

  constructor(
    private http: HttpClient,
    private priceCalculator: PriceCalculatorService,
    private config: ConfigService,
  ) {}

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
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.post<OrderResponse[]>(`${restServiceRoot}${path}`, filters),
      ),
    );
  }

  getReservations(
    pageable: Pageable,
    sorting: Sort[],
    filters: FilterCockpit,
  ): Observable<BookingResponse[]> {
    filters.pageable = pageable;
    filters.pageable.sort = sorting;
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.post<BookingResponse[]>(
          `${restServiceRoot}${this.getReservationsRestPath}`,
          filters,
        ),
      ),
    );
  }

  updateOrder(order: {id:number,stateId:number}): Observable<SaveOrderResponse[]> {
    let path: string = this.updateOrderRestPath;
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.post<SaveOrderResponse[]>(`${restServiceRoot}${path}`, order),
      ),
    );
  }

  changeOrderPayState(order: {id:number,paidId:number}): Observable<SaveOrderResponse[]> {
    let path: string = this.updateOrderPayStatePath;
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.post<SaveOrderResponse[]>(`${restServiceRoot}${path}`, order),
      ),
    );
  }


  changeTableNumber(booking: any): Observable<BookingView> {
    let path: string = this.updateTableNumber;
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
         this.http.post<BookingView>(`${restServiceRoot}${path}`, booking),
      ),
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
