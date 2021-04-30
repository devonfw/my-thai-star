import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ConfigService } from 'app/core/config/config.service';
import { UserListView } from 'app/shared/view-models/interfaces';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import {
  FilterAdmin,
  Pageable
} from '../shared/backend-models/interfaces';
import { AdminService } from './services/admin.service';
import { Sort } from '@angular/material/sort';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private translocoSubscription = Subscription.EMPTY;

  private pageable: Pageable = {
    pageSize: 8,
    pageNumber: 0,
  };
  private sorting: any[] = [];
  pageSize = 8;

  filters: FilterAdmin = {
    id: undefined,
    username: undefined,
    email: undefined,
    userRoleId: undefined
  };

  columns: any[];
  displayedColumns: string[] = [
    'users.id',
    'users.email',
    'users.username',
    'users.userRoleId'
  ];

  users :UserListView[] = [];
  totalUsers: number;


  pageSizes: number[];

  constructor(
    private translocoService: TranslocoService,
    private configService: ConfigService,
    private adminService: AdminService
  ) {
    this.pageSizes = this.configService.getValues().pageSizes;
  }

  // Daten werden beim Laden der Seite geholt
  ngOnInit(): void {
    this.applyFilters();
    this.translocoService.langChanges$.subscribe((event: any) => {
      this.setTableHeaders(event);
      moment.locale(this.translocoService.getActiveLang());
    });
  }

  // header für die Tabelle aus de.json (hängt von der Sprache ab) holen
  setTableHeaders(lang: string): void {
    this.translocoSubscription = this.translocoService
      .selectTranslateObject('admin.table', {}, lang)
      .subscribe((adminTable) => {
        this.columns = [
          { name: 'users.id', label: adminTable.idH },
          { name: 'users.email', label: adminTable.emailH },
          { name: 'users.username', label: adminTable.usernameH },
          { name: 'users.userRoleId', label: adminTable.userRoleIdH },
        ];
      });
  }

  // Daten aus Backend holen
  applyFilters(): void {
    console.log(this.sorting);
    this.adminService
      .getOrders(this.pageable, this.sorting, this.filters) // filters, wie sortiert, pagesize und pagenumber
      .subscribe((data: any) => {
        if (!data) {
          this.users = []; 
        } else {
          this.users = data.content;
        }
        this.totalUsers = data.totalElements;
        console.log(this.users);
      });
  }

  // Filters zurücksetzen
  clearFilters(filters: any) {
    filters.reset();
    this.applyFilters();
    // this.pagingBar.firstPage(); 
    //Pages sind auch nicht realisiert, deswegen auskommentiert
  }

  // Funktioniert nicht, Server nimmt Anfrage nicht an, 500 Fehler
  // Eventuell für die Anfrage mit Filters andere API nutzen
  // Kp ob diese schon existiert
  // getOrders() in admin.service muss entspechend angepasst werden
  sort(sortEvent: Sort): void {
    this.sorting = [];
    if (sortEvent.direction) {
      this.sorting.push({
        property: sortEvent.active,
        direction: '' + sortEvent.direction,
      });
    }
    this.applyFilters();
  }

}
