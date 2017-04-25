import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SidenavService } from './shared/sidenav.service';
import { SidenavOrderComponent } from './sidenav-order/sidenav-order.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  orders: any[];
  bookTableData: any;

  constructor(private router: Router, private sidenav: SidenavService) {
  }

  ngOnInit(): void {
    this.orders = this.sidenav.getOrderData();
  };

  closeSidenav(): void {
    this.sidenav.closeSideNav();
  };

  navigateMenu(): void {
    this.closeSidenav();
    this.router.navigate(['menu']);
  };

  reloadOrders(): void {
    this.orders = this.sidenav.getOrderData();
  }

  calculateTotal(): number {
    let sum: number = 0;
    _.forEach(this.orders, function(o) {
      sum += o.number * o.price;
      _.forEach(o.options, function(value, key) {
        if(value.selected) {
          sum = sum + value.price;
        }
      });
    });
    return sum;
  }
}
