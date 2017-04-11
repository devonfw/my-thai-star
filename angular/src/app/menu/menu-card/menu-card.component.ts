import { Component, Input } from '@angular/core';
import { SidenavSharedServiceService } from '../../sidenav/shared/sidenav-shared-service.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent {

  @Input('menu') menuInfo: any;
  backgroundImg: any;

  constructor(private sidenav: SidenavSharedServiceService) {
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

}
