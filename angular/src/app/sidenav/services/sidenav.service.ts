import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ExtraView,
  SaveOrderResponse,
} from '../../shared/view-models/interfaces';
import { OrderInfo, OrderListInfo } from 'app/shared/backend-models/interfaces';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../core/config/config.service';
import { Order } from '../models/order.model';
import { Store } from '@ngrx/store';
import * as fromOrder from 'app/sidenav/store/selectors';
import * as fromApp from 'app/store/reducers';
import { map, switchMap, exhaustMap } from 'rxjs/operators';

@Injectable()
export class SidenavService {
  private readonly restServiceRoot: string;
  private readonly saveOrdersPath: string = 'ordermanagement/v1/order';
  orders$: Observable<Order[]>;
  private orders: Order[] = [];

  opened = false;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private store: Store<fromApp.State>,
  ) {
    this.restServiceRoot = this.configService.getValues().restServiceRoot;
  }

  public openSideNav(): void {
    this.opened = true;
  }

  public closeSideNav(): void {
    this.opened = false;
  }

  public getNumberOrders(): any {
    this.orders$ = this.store.select(fromOrder.selectAll);
    return this.orders$;
  }

  public sendOrders(token: string): Observable<SaveOrderResponse> {
    /* this.orders$ = this.store.select(fromOrder.selectAll);
    let orderList: OrderListInfo = {
      booking: { bookingToken: token },
      orderLines: [],
    };
    this.orders$.subscribe((orderData) => {
      orderList = {
        booking: { bookingToken: token },
        orderLines: this.composeOrders(orderData),
      };
    });

    console.log('url called');
    this.closeSideNav();
    return this.http.post<SaveOrderResponse>(
      `${this.restServiceRoot}${this.saveOrdersPath}`,
      orderList,
    ); */
    this.orders$ = this.store.select(fromOrder.selectAll);
    return this.orders$.pipe(
      map((orderData) => {
        const orderList: OrderListInfo = {
          booking: { bookingToken: token },
          orderLines: this.composeOrders(orderData),
        };
        return orderList;
      }),
      exhaustMap((orderList) => {
        console.log('url called');
        this.closeSideNav();
        return this.http.post<SaveOrderResponse>(
          `${this.restServiceRoot}${this.saveOrdersPath}`,
          orderList,
        );
      }),
    );
  }

  composeOrders(orders: Order[]): OrderInfo[] {
    const composedOrders: OrderInfo[] = [];
    orders.forEach((order: Order) => {
      const extras: any[] = [];
      order.order.extras
        .filter((extra: ExtraView) => extra.selected)
        .forEach((extra: ExtraView) => extras.push({ id: extra.id }));
      composedOrders.push({
        orderLine: {
          dishId: order.order.dish.id,
          amount: order.order.orderLine.amount,
          comment: order.order.orderLine.comment,
        },
        extras: extras,
      });
    });
    return composedOrders;
  }
}
