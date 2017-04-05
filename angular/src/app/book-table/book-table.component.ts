import { SidenavSharedServiceService } from '../sidenav/shared/sidenav-shared-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})

export class BookTableComponent {

  constructor(private sidenav: SidenavSharedServiceService) {
  }

  openSidenav(): void {
    this.sidenav.openSideNav();
  }
}
