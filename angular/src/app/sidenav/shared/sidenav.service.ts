import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class SidenavService {

  opened: boolean = false;

  // Remark: Model definition missing here (propagates to other services etc.). It is already visible here
  // that fields such as orderName are assigned here, so there are some known parts of this model.
  orders: any = [
  ];

  public openSideNav(): void {
    this.opened = true;
  };

  public closeSideNav(): void {
    this.opened = false;
  };

  public getOrderData(): any[] {
    return this.orders;
  };

  public getNumberOrders(): any[] {
    return this.orders.length;
  };

  public findOrder(order) {
    return _.find(this.orders, function(o) { return o.orderName === order.orderName && _.isEqual(o.options, order.options); });
  }

  public addOrder(order: any): void {
    if (this.findOrder(order)) {
      this.increaseOrder(order);
    } else {
      order.number = 1;
      this.orders.push(JSON.parse(JSON.stringify(order)));
    }
    // Remark: According to my knowledge it is a good practice to return the inserted object (null i ncase of failure)
    // or a flag indicating if adding was successful. You can also build an observable which provides success and failure
    // handling out of the box (adding the order will be probably async anyway, as server needs to be notified).
  }

  public increaseOrder(order): number {
    return this.findOrder(order).number = this.findOrder(order).number + 1;
  }

  public decreaseOrder(order): number {
    return this.findOrder(order).number = this.findOrder(order).number - 1;
  }

  public removeOrder(order) {
    return _.remove(this.orders, function(o) { return o.orderName === order.orderName && _.isEqual(o.options, order.options); });
  }

}
