import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class SidenavSharedServiceService {

  opened: boolean = false;

  orders: any[] = [
    {orderName: 'name1', ingredients: ['ing1', 'ing2', 'ing3'], comment: 'comment', number: 1, price: 3.20 },
    {orderName: 'name2', ingredients: [], comment: '', number: 2, price: 5.20 },
    {orderName: 'name3', ingredients: ['ing1'], comment: '', number: 1, price: 9.00 },
    {orderName: 'name4', ingredients: [], comment: '', number: 3, price: 15.00 },
    {orderName: 'name5', ingredients: ['ing1', 'ing2'], comment: 'comment5', number: 1, price: 10.00 }
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

  public removeOrder(name: string): void {

  }
}
