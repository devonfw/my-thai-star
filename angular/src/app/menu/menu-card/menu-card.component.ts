import { Component, Input } from '@angular/core';
import { SidenavService } from '../../sidenav/shared/sidenav.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent {

  // Remark: Model type missing for menu info.
  @Input('menu') menuInfo: any; 

  constructor(private sidenav: SidenavService) {
  }

  openSidenav(): void {
    this.sidenav.openSideNav();
  }

  addOrderMenu(): void {
    this.sidenav.addOrder(this.menuInfo);
    this.openSidenav();
  }

  changeFavouriteState(): void {
    this.menuInfo.favourite = !this.menuInfo.favourite;
  }

  selectedOption(option): void {
    option.selected ? option.selected = false : option.selected = true;
  }

}
