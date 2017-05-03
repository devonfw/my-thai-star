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

  public addOrder(order: any): void {
    if (_.find(this.orders, function(o) { return o.orderName === order.orderName && _.isEqual(o.options, order.options); })) {
      this.increaseOrder(order);
    } else {
      order.number = 1;
      this.orders.push(JSON.parse(JSON.stringify(order)));
    }
    // Remark: According to my knowledge it is a good practice to return the inserted object (null i ncase of failure)
    // or a flag indicating if adding was successful. You can also build an observable which provides success and failure
    // handling out of the box (adding the order will be probably async anyway, as server needs to be notified).
  }

  public increaseOrder(order): void {
    // Remark: code duplication. At least a predicate can be defined and reused (twice here, four times in decrease Order),
    // once in removeOrder
    _.find(this.orders, function(o) {
      return o.orderName === order.orderName && _.isEqual(o.options, order.options);
    }).number = _.find(this.orders, function(o) {
      return o.orderName === order.orderName && _.isEqual(o.options, order.options);
    }).number + 1;
  }

  public decreaseOrder(order): void {
    _.find(this.orders, function(o) {
      return o.orderName === order.orderName && _.isEqual(o.options, order.options);
    }).number = _.find(this.orders, function(o) {
      return o.orderName === order.orderName && _.isEqual(o.options, order.options);
    }).number - 1;

    if (_.find(this.orders, function(o) { return o.orderName === order.orderName && _.isEqual(o.options, order.options); }).number < 1) {
      _.remove(this.orders, function(o) { return o.orderName === order.orderName && _.isEqual(o.options, order.options); });
    }
  }

  public removeOrder(order): void {
    _.remove(this.orders, function(o) { return o.orderName === order.orderName && _.isEqual(o.options, order.options); });
  }

}
