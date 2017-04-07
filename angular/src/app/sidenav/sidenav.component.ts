import { Component, OnInit } from '@angular/core';
import { SidenavSharedServiceService } from './shared/sidenav-shared-service.service';
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

  constructor(private sidenav: SidenavSharedServiceService) {
  }

  ngOnInit(): void {
    this.orders = this.sidenav.getOrderData();
  };

  closeSidenav(): void {
    this.sidenav.closeSideNav();
  };

  reloadOrders(): void {
    this.orders = this.sidenav.getOrderData();
  }

  calculateTotal(): number {
    let sum: number = 0;
    _.forEach(this.orders, function(o) {
      sum += o.number * o.price;
    });
    return sum;
  }
}
