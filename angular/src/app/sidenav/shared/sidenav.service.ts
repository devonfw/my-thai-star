import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ExtraView,
  OrderView,
  SaveOrderResponse,
} from '../../shared/view-models/interfaces';
import { find, filter, isEqual, remove, cloneDeep } from 'lodash';
import { OrderListInfo, OrderInfo } from 'app/shared/backend-models/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ConfigService } from '../../core/config/config.service';

const isOrderEqual: Function = (orderToFind: OrderView) => (o: OrderView) =>
  o.dish.name === orderToFind.dish.name &&
  isEqual(o.extras, orderToFind.extras);

/* @export
 * @class SidenavService
 */
@Injectable()
export class SidenavService {
  private readonly restServiceRoot: string;
  private readonly saveOrdersPath: string = 'ordermanagement/v1/order';
  private orders: OrderView[] = [];

  opened = false;

  /* Creates an instance of SidenavService.
   * @param {HttpClient} http
   * @param {ConfigService} configService
   * @memberof SidenavService
   */
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.restServiceRoot = this.configService.getValues().restServiceRoot;
  }

  public openSideNav(): void {
    this.opened = true;
  }

  public closeSideNav(): void {
    this.opened = false;
  }

  public getOrderData(): any[] {
    return this.orders;
  }

  public getNumberOrders(): number {
    return this.orders.length;
  }

  /* @param {OrderView} order
   * @returns {OrderView}
   * @memberof SidenavService
   */
  public findOrder(order: OrderView): OrderView {
    return find(this.orders, isOrderEqual(order));
  }

  /* @param {OrderView} order
   * @memberof SidenavService
   */
  public addOrder(order: OrderView): void {
    const addOrder: OrderView = cloneDeep(order);
    addOrder.extras = filter(
      addOrder.extras,
      (extra: ExtraView) => extra.selected,
    );
    if (this.findOrder(addOrder)) {
      this.increaseOrder(addOrder);
    } else {
      this.orders.push(addOrder);
    }
  }

  /* @param {OrderView} order
   * @returns {number}
   * @memberof SidenavService
   */
  public increaseOrder(order: OrderView): number {
    return (this.findOrder(order).orderLine.amount += 1);
  }

  /* @param {OrderView} order
   * @returns {number}
   * @memberof SidenavService
   */
  public decreaseOrder(order: OrderView): number {
    return (this.findOrder(order).orderLine.amount -= 1);
  }

  /* @param {OrderView} order
   * @returns {OrderView[]}
   * @memberof SidenavService
   */
  public removeOrder(order: OrderView): OrderView[] {
    return remove(this.orders, isOrderEqual(order));
  }

  /* @returns {OrderView[]}
   * @memberof SidenavService
   */
  public removeAllOrders(): OrderView[] {
    this.orders = [];
    return this.orders;
  }

  /* @param {string} token
   * @returns {Observable<SaveOrderResponse>}
   * @memberof SidenavService
   */
  public sendOrders(token: string): Observable<SaveOrderResponse> {
    const orderList: OrderListInfo = {
      booking: { bookingToken: token },
      orderLines: this.composeOrders(this.orders),
    };

    this.closeSideNav();
    return this.http.post<SaveOrderResponse>(
      `${this.restServiceRoot}${this.saveOrdersPath}`,
      orderList,
    );
  }

  /* @param {OrderView[]} orders
   * @returns {OrderInfo[]}
   * @memberof SidenavService
   */
  composeOrders(orders: OrderView[]): OrderInfo[] {
    const composedOrders: OrderInfo[] = [];
    orders.forEach((order: OrderView) => {
      const extras: any[] = [];
      order.extras
        .filter((extra: ExtraView) => extra.selected)
        .forEach((extra: ExtraView) => extras.push({ id: extra.id }));
      composedOrders.push({
        orderLine: {
          dishId: order.dish.id,
          amount: order.orderLine.amount,
          comment: order.orderLine.comment,
        },
        extras: extras,
      });
    });
    return composedOrders;
  }
}
