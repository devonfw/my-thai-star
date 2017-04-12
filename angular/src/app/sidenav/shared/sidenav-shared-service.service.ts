import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class SidenavSharedServiceService {

  opened: boolean = false;

  orders: any[] = [
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

  public addOrder(order: any): void {
    if (_.find(this.orders, function(o) { return o.orderName === order.orderName && _.isEqual(o.options, order.options); })) {
      this.increaseOrder(order);
    } else {
      order.number = 1;
      order.id = this.orders[this.orders.length - 1];
      this.orders.push(JSON.parse(JSON.stringify(order)));
    }
  }

  public increaseOrder(order): void {
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
