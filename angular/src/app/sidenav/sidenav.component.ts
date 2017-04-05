import { Component, OnInit } from '@angular/core';
import { SidenavSharedServiceService } from './shared/sidenav-shared-service.service';
import { SidenavOrderComponent } from './sidenav-order/sidenav-order.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  orders: any[];
  bookTableData: any;
  totalPrice: number = 15;

  constructor(private sidenav: SidenavSharedServiceService) {
  }

  ngOnInit(): void {
    this.orders = this.sidenav.getOrderData();
    this.bookTableData = this.sidenav.getBookTableData();
  };

  closeSidenav(): void {
    this.sidenav.closeSideNav();
  };

}
