import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SidenavService } from './shared/sidenav.service';
import { SidenavOrderComponent } from './sidenav-order/sidenav-order.component';
import { ExtraView, OrderView } from '../shared/models/interfaces';
import * as _ from 'lodash';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  orders: OrderView[];

  constructor(private router: Router, private sidenav: SidenavService) {
  }

  ngOnInit(): void {
    this.orders = this.sidenav.getOrderData();
  };

  closeSidenav(): void {
    this.sidenav.closeSideNav();
  };

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeSidenav();
  }

  reloadOrders(): void {
    this.orders = this.sidenav.getOrderData();
  }

  calculateTotal(): number {
    return _.reduce(this.orders, (sum: number, order: OrderView): number => {
           return sum + (order.price +
           _.reduce(order.options, (sum2: number, option: ExtraView): number => {
             if (option.selected) {
               return sum2 + option.price;
             } else {
               return sum2;
             }
           }, 0)) * order.number;
         }, 0);
  }
}
