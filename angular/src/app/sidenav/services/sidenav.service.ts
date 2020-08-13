import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderInfo, OrderListInfo } from 'app/shared/backend-models/interfaces';
import * as fromOrder from 'app/sidenav/store/selectors/order.selectors';
import * as fromApp from 'app/store/reducers';
import { Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import {
  ExtraView,
  SaveOrderResponse,
} from '../../shared/view-models/interfaces';
import { Order } from '../models/order.model';
import { ConfigService } from '../../core/config/config.service';

@Injectable()
export class SidenavService {
  private readonly restServiceRoot$: Observable<
    string
  > = this.config.getRestServiceRoot();
  private readonly saveOrdersPath: string = 'ordermanagement/v1/order';
  orders$: Observable<Order[]>;

  opened = false;

  constructor(
    private http: HttpClient,
    private store: Store<fromApp.State>,
    private config: ConfigService,
  ) {}

  public openSideNav(): void {
    this.opened = true;
  }

  public closeSideNav(): void {
    this.opened = false;
  }

  public getNumberOrders(): Observable<number> {
    this.orders$ = this.store.select(fromOrder.getAllOrders);
    return this.orders$.pipe(map((orders) => orders.length));
  }

  public sendOrders(token: string): Observable<SaveOrderResponse> {
    this.orders$ = this.store.select(fromOrder.getAllOrders);
    return this.orders$.pipe(
      map((orderData) => {
        const orderList: OrderListInfo = {
          booking: { bookingToken: token },
          orderLines: this.composeOrders(orderData),
        };
        return orderList;
      }),
      exhaustMap((orderList) => {
        this.closeSideNav();
        return this.restServiceRoot$.pipe(
          exhaustMap((restServiceRoot) =>
            this.http.post<SaveOrderResponse>(
              `${restServiceRoot}${this.saveOrdersPath}`,
              orderList,
            ),
          ),
        );
      }),
    );
  }

  composeOrders(orders: Order[]): OrderInfo[] {
    const composedOrders: OrderInfo[] = [];
    orders.forEach((order: Order) => {
      const extras: any[] = [];
      order.details.extras.forEach((extra: ExtraView) =>
        extras.push({ id: extra.id }),
      );
      composedOrders.push({
        orderLine: {
          dishId: order.details.dish.id,
          amount: order.details.orderLine.amount,
          comment: order.details.orderLine.comment,
        },
        extras,
      });
    });
    return composedOrders;
  }
}
