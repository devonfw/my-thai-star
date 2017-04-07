import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class SidenavSharedServiceService {

  opened: boolean = false;

  orders: any[] = [
    {id: 0, orderName: 'name1', ingredients: ['ing1', 'ing2', 'ing3'], comment: 'comment', number: 1, price: 3.20 },
    {id: 1, orderName: 'name2', ingredients: [], comment: '', number: 2, price: 5.20 },
    {id: 2, orderName: 'name3', ingredients: ['ing1'], comment: '', number: 1, price: 9.00 },
    {id: 3, orderName: 'name4', ingredients: [], comment: '', number: 3, price: 15.00 },
    {id: 4, orderName: 'name5', ingredients: ['ing1', 'ing2'], comment: 'comment5', number: 1, price: 6.50 },
    {id: 5, orderName: 'name6', ingredients: ['ing2'], comment: '', number: 1, price: 5.90 },
    {id: 6, orderName: 'name7', ingredients: ['ing2', 'ing3'], comment: '', number: 1, price: 4.5 },
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

  }

  public increaseOrder(orderId: number): void {
    _.find(this.orders, function(o) { return o.id === orderId; }).number = _.find(this.orders, function(o) { return o.id === orderId; }).number + 1;
  }

  public decreaseOrder(orderId: string): void {
    _.find(this.orders, function(o) { return o.id === orderId; }).number = _.find(this.orders, function(o) { return o.id === orderId; }).number - 1;
    if (_.find(this.orders, function(o) { return o.id === orderId; }).number < 1) {
      this.orders = _.filter(this.orders, function(o) { return o.id !== orderId; });
    }
  }

  public removeOrder(orderId: string): void {
    this.orders = _.filter(this.orders, function(o) { return o.id !== orderId; });
}

}
