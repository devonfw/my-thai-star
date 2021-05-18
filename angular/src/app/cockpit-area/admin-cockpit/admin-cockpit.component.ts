import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TranslocoService } from '@ngneat/transloco';
import { ConfigService } from 'app/core/config/config.service';
import { UserListView, UserView } from 'app/shared/view-models/interfaces';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FilterAdmin, Pageable } from '../../shared/backend-models/interfaces';
import { Sort } from '@angular/material/sort';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { UserInfo } from 'app/shared/backend-models/interfaces';
import { AdminService } from '../services/admin.service';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-cockpit-admin-cockpit',
  templateUrl: './admin-cockpit.component.html',
  styleUrls: ['./admin-cockpit.component.scss'],
})
export class AdminCockpitComponent implements OnInit {
  private translocoSubscription = Subscription.EMPTY;
  private pageable: Pageable = {
    pageSize: 8,
    pageNumber: 0,
  };
  private sorting: any[] = [];
  pageSize = 8;

  @ViewChild('pagingBar', { static: true }) pagingBar: MatPaginator;

  columns: any[];

  roleNames = [
    "customer",
    "waiter",
    "manager",
    "admin"
  ]

  displayedColumns: string[] = [
    'users.email',
    'users.username',
    'users.userRoleId',
    'users.deleteButton',
  ];

  users: UserView[];
  totalUsers: number;
  @ViewChild(MatTable) table: MatTable<any>;

  pageSizes: number[];

  filters: FilterAdmin = {
    username: undefined,
    email: undefined,
  };

  constructor(
    private translocoService: TranslocoService,
    private configService: ConfigService,
    private adminService: AdminService,
    public matDialog: MatDialog
  ) {
    this.pageSizes = this.configService.getValues().pageSizes;
  }

  // Daten werden beim Laden der Seite geholt
  ngOnInit(): void {
    this.applyFilters();
    this.translocoService.langChanges$.subscribe((event: any) => {
      this.setTableHeaders(event);
      console.log(this.columns)
      moment.locale(this.translocoService.getActiveLang());
    });
  }

  // header für die Tabelle aus de.json (hängt von der Sprache ab) holen
  setTableHeaders(lang: string): void {
    this.translocoSubscription = this.translocoService
      .selectTranslateObject('cockpit.admin.table', {}, lang)
      .subscribe((adminTable) => {
        this.columns = [
          { name: 'users.email', label: adminTable.emailH },
          { name: 'users.username', label: adminTable.usernameH },
          { name: 'users.userRoleId', label: adminTable.userRoleIdH },
          { name: 'users.deleteButton', label: adminTable.deleteButtonH }, //TODO, aus header für Tabelle raus bekommen, unnötig
        ];
      });
  }

  // Daten aus Backend holen
  applyFilters(): void {
    this.adminService
      .getUsers(this.pageable, this.sorting, this.filters) // filters, wie sortiert, pagesize und pagenumber
      .subscribe((data: any) => {
        if (!data) {
          this.users = null;
        } else {
          this.users = data.content;
        }
        this.totalUsers = data.totalElements;
      });
  }

  // Filters zurücksetzen
  clearFilters(filters: any) {
    filters.reset();
    this.applyFilters();
    //this.pagingBar.firstPage();
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

  clickDelete(user: UserInfo): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '170px';
    dialogConfig.width = '300px';
    dialogConfig.data = user;
    const modalDialog = this.matDialog.open(DeleteUserDialogComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(row => {
      const index = this.users.indexOf(row, 0);
      if (index > -1) {
        this.users.splice(index, 1);
      }
      this.table.renderRows();
    });
  }

  clickAdd(): void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '500px';
    dialogConfig.width = '600px';
    const modalDialog = this.matDialog.open(RegisterDialogComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(user => {
      if(user.id) {
        this.users.push(user);
        this.table.renderRows();
      }
    });
  }
}
