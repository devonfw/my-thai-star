import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SidenavService } from './shared/sidenav.service';
import { PriceCalculatorService } from './shared/price-calculator.service';
import { SidenavOrderComponent } from './sidenav-order/sidenav-order.component';
import { ExtraView, OrderView } from '../shared/viewModels/interfaces';
import { toNumber } from 'lodash';

@Component({
  selector: 'public-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  orders: OrderView[];

  constructor(private router: Router,
    private sidenav: SidenavService,
    private calculator: PriceCalculatorService,
  ) {}

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

  sendOrders(bookingId: string): void {
    this.sidenav.sendOrders(bookingId);
    this.orders = this.sidenav.getOrderData();
  }
}
