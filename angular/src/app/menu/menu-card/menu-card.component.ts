import { Component, Input } from '@angular/core';
import { SidenavService } from '../../sidenav/shared/sidenav.service';
import { DishView, ExtraView, OrderView } from '../../shared/models/interfaces';

@Component({
  selector: 'public-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
})
export class MenuCardComponent {

  @Input('menu') menuInfo: DishView;

  constructor(private sidenav: SidenavService) {
  }

  addOrderMenu(): void {
    this.sidenav.addOrder({
      name: this.menuInfo.name,
      price: this.menuInfo.price,
      extras: this.menuInfo.extras,
      amount: 1,
      comment: '',
    });
    this.sidenav.openSideNav();
  }

  changeFavouriteState(): void {
    this.menuInfo.isfav = !this.menuInfo.isfav;
  }

  selectedOption(extra: ExtraView): void {
    extra.selected ? extra.selected = false : extra.selected = true;
  }

}
