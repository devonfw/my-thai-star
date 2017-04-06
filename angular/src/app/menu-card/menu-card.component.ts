import { Component, EventEmitter, Output } from '@angular/core';
import { SidenavSharedServiceService } from '../sidenav/shared/sidenav-shared-service.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent {

  orderInfo = {
    orderName: 'Green Curry',
    orderDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id viverra turpis, sed eleifend dui. Proin fermentum lobortis neque. Pellentesque habitant morbi tristique.',
    price: 7.68,
    image: '',
    options: [{name: 'Tofu', price: 1}, {name: 'Chiken', price: 1}, {name: 'Pork', price: 2}],
    likes: 61,
    favourite: false
  }

  constructor(private sidenav: SidenavSharedServiceService) {
  }

  openSidenav(): void {
    this.sidenav.openSideNav();
  }

  addOrderMenu(): void {
    this.sidenav.addOrder(this.orderInfo);
    this.openSidenav();
  }

  changeFavouriteState(): void {
    this.orderInfo.favourite = !this.orderInfo.favourite;
  }

}
