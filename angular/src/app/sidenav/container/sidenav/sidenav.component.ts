import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from 'app/sidenav/models/order.model';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../store';
import { SidenavService } from '../../services/sidenav.service';
import * as fromOrder from '../../store';

@Component({
  selector: 'app-public-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  bookingId: string;
  orders$: Observable<Order[]>;
  orders: Order[];
  totalPrice$: Observable<number>;

  constructor(
    private sidenav: SidenavService,
    private store: Store<fromOrder.SideNavState>,
  ) {}

  ngOnInit(): void {
    this.orders$ = this.store.select(fromOrder.getAllOrders);
    this.store
      .select(fromOrder.getAllOrders)
      .subscribe((orders) => (this.orders = orders));
    this.totalPrice$ = this.store.select(fromOrder.getTotalPrice);
  }

  closeSidenav(): void {
    this.sidenav.closeSideNav();
  }

  navigateTo(route: string): void {
    this.store.dispatch(fromRoot.go({ path: [route] }));
    this.closeSidenav();
  }

  sendOrders(bookingId: string): void {
    this.store.dispatch(fromOrder.sendOrders({ token: bookingId }));
  }

  findOrder(id: string): Order {
    return this.orders.find((order) => order.id === id);
  }

  onOrderIncreased(order: Order): void {
    const orderToUpdate = this.findOrder(order.id);
    if (orderToUpdate) {
      this.store.dispatch(
        fromOrder.updateOrder({
          order: {
            id: order.id,
            changes: {
              details: {
                ...orderToUpdate.details,
                extras: orderToUpdate.details.extras,
                orderLine: {
                  ...orderToUpdate.details.orderLine,
                  amount: orderToUpdate.details.orderLine.amount + 1,
                },
              },
            },
          },
        }),
      );
    }
  }

  onOrderDecreased(order: Order): void {
    const orderToUpdate = this.findOrder(order.id);
    if (orderToUpdate) {
      if (orderToUpdate.details.orderLine.amount > 1) {
        this.store.dispatch(
          fromOrder.updateOrder({
            order: {
              id: order.id,
              changes: {
                details: {
                  ...orderToUpdate.details,
                  extras: orderToUpdate.details.extras,
                  orderLine: {
                    ...orderToUpdate.details.orderLine,
                    amount: orderToUpdate.details.orderLine.amount - 1,
                  },
                },
              },
            },
          }),
        );
      } else {
        // Since the amount is 0 we remove it from the store
        this.store.dispatch(fromOrder.deleteOrder({ id: order.id }));
      }
    }
  }

  onOrderRemoved(order: Order): void {
    this.store.dispatch(fromOrder.deleteOrder({ id: order.id }));
  }

  onCommentRemoved(order: Order): void {
    this.store.dispatch(
      fromOrder.updateOrder({
        order: {
          id: order.id,
          changes: {
            details: {
              dish: order.details.dish,
              orderLine: {
                amount: order.details.orderLine.amount,
                comment: null,
              },
              extras: order.details.extras,
            },
          },
        },
      }),
    );
  }

  onCommentAdded(order: Order): void {
    this.store.dispatch(
      fromOrder.updateOrder({
        order: {
          id: order.id,
          changes: {
            details: {
              dish: order.details.dish,
              orderLine: {
                amount: order.details.orderLine.amount,
                comment: order.details.orderLine.comment,
              },
              extras: order.details.extras,
            },
          },
        },
      }),
    );
  }
}
