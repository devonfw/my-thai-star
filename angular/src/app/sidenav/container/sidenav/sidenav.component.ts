import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {BookTableState} from '../../../book-table/store/reducers';
import {Order} from '../../../menu/models/order.model';
import {DeleteOrder, DeleteOrders, UpdateOrder} from '../../../menu/store/actions/order.actions';
import {TdDialogService} from '@covalent/core';
import * as fromApp from '../../../store/reducers';
import * as fromOrder from 'app/menu/store/reducers/order.reducer';

@Component({
  selector: 'public-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  bookingState$: Observable<BookTableState>;
  bookingId: string;
  orders$: Observable<Order[]>;
  orders: Order[];
  amountTotal: number;

  constructor(
    private router: Router,
    private _dialogService: TdDialogService,
    private sidenav: SidenavService,
    private snackBar: SnackBarService,
    private bookingStore: Store<fromApp.AppState>,
    private orderStore: Store<fromOrder.State>
  ) {
    this.bookingState$ = this.bookingStore.select('bookings');
  }

  ngOnInit(): void {
    this.amountTotal = 0;
    this.orders$ = this.orderStore.select(fromOrder.selectAll);
    this.orderStore.select(fromOrder.selectAll).subscribe(orders => this.orders = orders);
  }

  closeSidenav(): void {
    this.sidenav.closeSideNav();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeSidenav();
  }

  sendOrders(): void {
    this.bookingState$.subscribe(id => {
      this.sidenav.sendOrders(id.bookings.bookingResponse.bookingToken)
        .subscribe(() => {
            this.orderStore.dispatch(new DeleteOrders({ids: this.orders.map(orders => orders.id)}));
            this.snackBar.openSnack('Order correctly noted', 4000, 'green');
          },
          (error: any) => {
            this.snackBar.openSnack('Please book a table first', 4000, 'red');
          });
    });
  }

  onOrderIncreased(order: Order): void {
    this.orderStore.dispatch(new UpdateOrder({
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
    this.orderStore.dispatch(new UpdateOrder({
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
    this.orderStore.dispatch(new DeleteOrder({id: order.id}));
  }

  onCommentRemoved(order: Order): void {
    this.orderStore.dispatch(new UpdateOrder({
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
    this.orderStore.dispatch(new UpdateOrder({
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

  calculateTotal(): number {
    this.amountTotal = 0;
    this.orders.map(total => this.amountTotal = this.amountTotal + (total.order.dish.price * total.order.orderLine.amount));
    return this.amountTotal;
  }
}
