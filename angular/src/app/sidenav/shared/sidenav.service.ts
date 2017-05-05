import { Injectable } from '@angular/core';
import { OrderView } from '../../shared/models/interfaces';
import * as _ from 'lodash';

@Injectable()
export class SidenavService {

  opened: boolean = false;

  orders: OrderView[] = [
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

  public getNumberOrders(): number {
    return this.orders.length;
  };

  public findOrder(order: OrderView): OrderView {
    return _.find(this.orders, function(o: OrderView): OrderView {
      return o.orderName === order.orderName && _.isEqual(o.options, order.options);
    });
  }

  public addOrder(order: OrderView): void {
    if (this.findOrder(order)) {
      this.increaseOrder(order);
    } else {
      this.orders.push(JSON.parse(JSON.stringify(order)));
    }
  }

  public increaseOrder(order: OrderView): number {
    return this.findOrder(order).number = this.findOrder(order).number + 1;
  }

  public decreaseOrder(order: OrderView): number {
    return this.findOrder(order).number = this.findOrder(order).number - 1;
  }

  public removeOrder(order: OrderView): OrderView {
    return _.remove(this.orders, function(o: OrderView): OrderView {
       return o.orderName === order.orderName && _.isEqual(o.options, order.options);
    });
  }

}
