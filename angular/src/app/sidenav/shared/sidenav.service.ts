import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { BookingDataService } from '../../shared/backend/booking/booking-data-service';
import { OrderView } from '../../shared/viewModels/interfaces';
import { OrderList } from '../../shared/backend/backendModels/interfaces';
import { find, isEqual, remove, cloneDeep } from 'lodash';

const isOrderEqual: Function = (orderToFind: OrderView) => (o: OrderView) => o.name === orderToFind.name && isEqual(o.extras, orderToFind.extras);

@Injectable()
export class SidenavService {

  opened: boolean = false;

  orders: OrderView[] = [];

  constructor(private snackBar: MdSnackBar,
              private bookingDataService: BookingDataService) {}

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
    return find(this.orders, isOrderEqual(order));
  }

  public addOrder(order: OrderView): void {
    if (this.findOrder(order)) {
      this.increaseOrder(order);
    } else {
      this.orders.push(cloneDeep(order));
    }
  }

  public increaseOrder(order: OrderView): number {
    return this.findOrder(order).amount += 1;
  }

  public decreaseOrder(order: OrderView): number {
    return this.findOrder(order).amount -= 1;
  }

  public removeOrder(order: OrderView): OrderView {
    return remove(this.orders, isOrderEqual(order));
  }

  public sendOrders(id: number): void {
    let orderList: OrderList = {
      bookingId: id,
      orders: cloneDeep(this.orders),
    };
    this.closeSideNav();
    this.bookingDataService.saveOrders(orderList)
      .subscribe(() => {
          this.orders = [];
          this.snackBar.open('Order correctly noted', 'OK', {
            duration: 4000,
            extraClasses: ['bgc-green-600'],
          });
      },
      (error: any) => {
          this.snackBar.open('Booking ID not existing', 'OK', {
            duration: 8000,
            extraClasses: ['bgc-red-600'],
          });
      });
   }
}
