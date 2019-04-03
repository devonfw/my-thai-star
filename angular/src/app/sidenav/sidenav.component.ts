import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { PriceCalculatorService } from './services/price-calculator.service';
import { SnackBarService } from '../core/snack-bar/snack-bar.service';
import { OrderView } from '../shared/view-models/interfaces';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/reducers';
import {Observable} from 'rxjs';
import {BookTableState} from '../book-table/store/reducers';

@Component({
  selector: 'public-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  bookingState$: Observable<BookTableState>;
  orders: OrderView[];
  bookingId: string;

  constructor(private router: Router,
    private sidenav: SidenavService,
    private snackBar: SnackBarService,
    private calculator: PriceCalculatorService,
    private store: Store<fromApp.AppState>
  ) {
    this.bookingState$ = this.store.select('bookings');
  }

  ngOnInit(): void {
    this.orders = this.sidenav.getOrderData();
  }

  closeSidenav(): void {
    this.sidenav.closeSideNav();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeSidenav();
  }

  calculateTotal(): number {
    return this.calculator.getTotalPrice(this.orders);
  }

  sendOrders(): void {
    this.bookingState$.subscribe(id => {
      this.sidenav.sendOrders(id.bookings.bookingResponse.bookingToken)
        .subscribe(() => {
            this.orders = this.sidenav.removeAllOrders();
            this.snackBar.openSnack('Order correctly noted', 4000, 'green');
          },
          (error: any) => {
            this.snackBar.openSnack('Please book a table first', 4000, 'red');
          });
    });
  }
}
