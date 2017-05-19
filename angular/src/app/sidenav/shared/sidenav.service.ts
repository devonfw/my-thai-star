import { OrderList } from '../../shared/backend/booking/orderList';
import { Observable } from 'rxjs/Observable';
import { BookingDataService } from '../../shared/backend/booking/booking-data-service';
import { Injectable } from '@angular/core';
import { OrderView } from '../../shared/models/interfaces';
import { MdSnackBar } from '@angular/material';
import * as _ from 'lodash';

@Injectable()
export class SidenavService {

  opened: boolean = false;

  orders: OrderView[] = [
  ];

  constructor(private snackBar: MdSnackBar, private bookingDataService: BookingDataService) {}

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

  public findOrder(order: OrderView): OrderView {
    return _.find(this.orders, function(o: OrderView): OrderView {
      return o.name === order.name && _.isEqual(o.extras, order.extras);
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
    return this.findOrder(order).amount = this.findOrder(order).amount + 1;
  }

  public decreaseOrder(order: OrderView): number {
    return this.findOrder(order).amount = this.findOrder(order).amount - 1;
  }

  public removeOrder(order: OrderView): OrderView {
    return _.remove(this.orders, function(o: OrderView): OrderView {
       return o.name === order.name && _.isEqual(o.extras, order.extras);
    });
  }

  public sendOrders(id: number): void {
    let orderList: OrderList = {
      bookingId: id,
      orders: JSON.parse(JSON.stringify(this.orders)),
    };
    this.closeSideNav();
    let result: Observable<number> = this.bookingDataService.saveOrders(orderList);
    result.subscribe( (res: number) => {
      if (res) {
        _.remove(this.orders, function(o: OrderView): boolean {
            return true;
        });

        this.snackBar.open('Order correctly noted', 'OK', {
          duration: 4000,
          extraClasses: ['bgc-green-600'],
        });
      } else {
        this.snackBar.open('Booking ID not existing', 'OK', {
          duration: 8000,
          extraClasses: ['bgc-red-600'],
        });
      }
    });
   }
}
