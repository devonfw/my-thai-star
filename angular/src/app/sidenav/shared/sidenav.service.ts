import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BookingDataService } from '../../shared/backend/booking/booking-data-service';
import { SnackBarService } from '../../shared/snackService/snackService.service';
import { OrderView, ExtraView } from '../../shared/viewModels/interfaces';
import { OrderListInfo, OrderInfo } from '../../shared/backend/backendModels/interfaces';
import { find, filter, isEqual, remove, cloneDeep, toString } from 'lodash';

const isOrderEqual: Function =
   (orderToFind: OrderView) => (o: OrderView) => o.dish.name === orderToFind.dish.name && isEqual(o.extras, orderToFind.extras);

@Injectable()
export class SidenavService {

  opened: boolean = false;

  orders: OrderView[] = [];

  constructor(private snackBar: SnackBarService,
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
    let addOrder: OrderView = cloneDeep(order);
    addOrder.extras = filter(addOrder.extras, (extra: ExtraView) => extra.selected);
    if (this.findOrder(addOrder)) {
      this.increaseOrder(addOrder);
    } else {
      this.orders.push(addOrder);
    }
  }

  public increaseOrder(order: OrderView): number {
    return this.findOrder(order).orderLine.amount += 1;
  }

  public decreaseOrder(order: OrderView): number {
    return this.findOrder(order).orderLine.amount -= 1;
  }

  public removeOrder(order: OrderView): OrderView {
    return remove(this.orders, isOrderEqual(order));
  }

  public sendOrders(id: number): void {

    let orderList: OrderListInfo = {
      booking: {bookingToken: toString(id)},
      orderLines: this.composeOrders(this.orders),
    };

    this.closeSideNav();
    this.bookingDataService.saveOrders(orderList)
        .subscribe(() => {
            this.orders = [];
            this.snackBar.openSnack('Order correctly noted', 4000, 'green');
        },
        (error: any) => {
            this.snackBar.openSnack('Booking ID not existing', 4000, 'red');
        });
   }

   composeOrders(orders: OrderView[]): OrderInfo[] {
      let composedOrders: OrderInfo[] = [];
      orders.forEach( (order: OrderView) => {
        let extras: number[] = [];
        order.extras.filter( (extra: ExtraView) => extra.selected )
                    .forEach( (extra: ExtraView) => extras.push(extra.id));
        composedOrders.push({
          orderLine: {
            idDish: order.dish.idDish,
            amount: order.orderLine.amount,
            comment: order.orderLine.comment,
          },
          extras: extras,
        });
      });
      return composedOrders;
   }
}
