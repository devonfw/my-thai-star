import { Component, Input } from '@angular/core';
import { DishView, ExtraView } from '../../shared/view-models/interfaces';
import { SidenavService } from '../../sidenav/shared/sidenav.service';
import { MenuService } from '../shared/menu.service';
import { AuthService } from '../../core/authentication/auth.service';

@Component({
  selector: 'public-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
})
export class MenuCardComponent {
  @Input() menuInfo: DishView;

  constructor(
    private menuService: MenuService,
    public auth: AuthService,
    private sidenav: SidenavService,
  ) {}

  addOrderMenu(): void {
    this.sidenav.addOrder(this.menuService.menuToOrder(this.menuInfo));
    this.sidenav.openSideNav();
    this.menuService.clearSelectedExtras(this.menuInfo);
  }

  changeFavouriteState(): void {
    this.menuInfo.isfav = !this.menuInfo.isfav;
  }

  selectedOption(extra: ExtraView): void {
    extra.selected = !extra.selected;
  }
}
