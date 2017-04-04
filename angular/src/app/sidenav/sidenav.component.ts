import { SidenavSharedServiceService } from './sidenav-shared-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  constructor(private sidenav: SidenavSharedServiceService) {
  }

  closeSidenav(): void {
    this.sidenav.closeSideNav();
  }

}
