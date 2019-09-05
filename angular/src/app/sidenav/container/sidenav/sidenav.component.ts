import {Router} from '@angular/router';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Order} from 'app/sidenav/models/order.model';
import * as fromApp from 'app/store/reducers';
import * as fromOrder from 'app/sidenav/store/selectors';
import {SidenavService} from '../../services/sidenav.service';
import {SnackBarService} from '../../../core/snack-bar/snack-bar.service';
import {ClearOrders, DeleteOrder, UpdateOrder} from '../../store/actions/order.actions';

@Component({
  selector: 'public-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  bookingId: string;
  orders$: Observable<Order[]>;
  totalPrice$: Observable<number>;

  constructor(
    private router: Router,
    private sidenav: SidenavService,
    private snackBar: SnackBarService,
    private store: Store<fromApp.State>,
  ) {}

  ngOnInit(): void {
    this.orders$ = this.store.select(fromOrder.selectAll);
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
    this.sidenav.sendOrders(bookingId)
      .subscribe(() => {
          this.store.dispatch(new ClearOrders());
          this.snackBar.openSnack('Order correctly noted', 4000, 'green');
        },
        (error: any) => {
          this.snackBar.openSnack('Please book a table first', 4000, 'red');
        });
  }

  onOrderIncreased(order: Order): void {
    this.store.dispatch(new UpdateOrder({
      order: {
        id: order.order.dish.id,
        changes: {
          order: {
            dish: order.order.dish,
            orderLine: {
              amount: order.order.orderLine.amount + 1,
              comment: order.order.orderLine.comment,
            },
            extras: order.order.extras
          }
        }
      }
    }));
  }

  onOrderDecreased(order: Order): void {
    this.store.dispatch(new UpdateOrder({
      order: {
        id: order.order.dish.id,
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
    this.store.dispatch(new DeleteOrder({id: order.id}));
  }

  onCommentRemoved(order: Order): void {
    this.store.dispatch(new UpdateOrder({
      order: {
        id: order.order.dish.id,
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
    this.store.dispatch(new UpdateOrder({
      order: {
        id: order.order.dish.id,
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
