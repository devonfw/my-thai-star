import { Component, Input } from '@angular/core';
import { SidenavService } from '../../sidenav/shared/sidenav.service';
import { DishView, ExtraView, OrderView } from '../../shared/models/interfaces';
import * as _ from 'lodash';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
})
export class MenuCardComponent {

  @Input('menu') menuInfo: DishView;

  constructor(private sidenav: SidenavService) {
  }

  openSidenav(): void {
    this.sidenav.openSideNav();
  }

  addOrderMenu(): void {
    let order: OrderView = {
      orderName: this.menuInfo.orderName,
      price: this.menuInfo.price,
      options: this.menuInfo.options,
      number: 1,
      comment: '',
    };
    order.orderName = this.menuInfo.orderName;
    order.options = this.menuInfo.options;
    this.sidenav.addOrder(order);
    this.openSidenav();
  }

  changeFavouriteState(): void {
    this.menuInfo.favourite = !this.menuInfo.favourite;
  }

  selectedOption(option: ExtraView): void {
    option.selected ? option.selected = false : option.selected = true;
  }

}
