import { Component, EventEmitter, Output } from '@angular/core';
import { SidenavSharedServiceService } from '../sidenav/shared/sidenav-shared-service.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent {

  favouriteSelected: boolean = false;

  constructor(private sidenav: SidenavSharedServiceService) {
  }

  openSidenav(): void {
    this.sidenav.openSideNav();
  }

  changeFavouriteState(): void {
    this.favouriteSelected = !this.favouriteSelected;
  }

}
