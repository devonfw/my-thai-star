import {Router} from '@angular/router';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Order} from 'app/sidenav/models/order.model';
import * as fromApp from 'app/store/reducers';
import * as fromOrder from 'app/sidenav/store/selectors';
import {SidenavService} from '../../services/sidenav.service';
import {SnackBarService} from '../../../core/snack-bar/snack-bar.service';
import * as orderActions from '../../store/actions/order.actions';
import * as sendOrderActions from '../../store/actions/send-order.actions';

@Component({
  selector: 'public-sidenav',
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
    private router: Router,
    private sidenav: SidenavService,
    private snackBar: SnackBarService,
    private store: Store<fromApp.State>,
  ) {}

  ngOnInit(): void {
    this.orders$ = this.store.select(fromOrder.selectAll);
    this.store
      .select(fromOrder.selectAll)
      .subscribe((orders) => (this.orders = orders));
    this.totalPrice$ = this.store.select(fromOrder.getTotalPrice);
  }

  closeSidenav(): void {
    this.sidenav.closeSideNav();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeSidenav();
  }

  sendOrders(bookingId: string): void {
    this.store.dispatch(sendOrderActions.sendOrders({token: bookingId}));
  }

  onOrderIncreased(order: Order): void {
    const orderUpdate = this.orders.find(
      (o) => '' + o.id === order.order.dish.id + order.order.extras.map((e) => e.id).join(''),
    );
    this.store.dispatch(orderActions.updateOrder({
      order: {
        id: orderUpdate.id,
        changes: {
          order: {
            ...orderUpdate.order,
            extras: orderUpdate.order.extras,
            orderLine: {
              ...orderUpdate.order.orderLine,
              amount: orderUpdate.order.orderLine.amount + 1
            },
          }
        }
      }
    }));
  }

  onOrderDecreased(order: Order): void {
    this.store.dispatch(orderActions.updateOrder({
      order: {
        id: order.id,
        changes: {
          order: {
            dish: order.order.dish,
            orderLine: {
              amount: order.order.orderLine.amount - 1,
              comment: order.order.orderLine.comment,
            },
            extras: order.order.extras
          }
        }
      }
    }));
  }

  onOrderRemoved(order: Order): void {
    this.store.dispatch(orderActions.deleteOrder({id: order.id}));
  }

  onCommentRemoved(order: Order): void {
    this.store.dispatch(orderActions.updateOrder({
      order: {
        id: order.id,
        changes: {
          order: {
            dish: order.order.dish,
            orderLine: {
              amount: order.order.orderLine.amount,
              comment: null,
            },
            extras: order.order.extras
          }
        }
      }
    }));
  }

  onCommentAdded(order: Order): void {
    this.store.dispatch(orderActions.updateOrder({
      order: {
        id: order.id,
        changes: {
          order: {
            dish: order.order.dish,
            orderLine: {
              amount: order.order.orderLine.amount,
              comment: order.order.orderLine.comment,
            },
            extras: order.order.extras
          }
        }
      }
    }));
  }
}
