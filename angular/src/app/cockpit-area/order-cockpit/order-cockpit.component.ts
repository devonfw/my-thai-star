import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { TranslocoService } from '@ngneat/transloco';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../core/config/config.service';
import {
  FilterCockpit,
  Pageable,
} from '../../shared/backend-models/interfaces';
import { OrderListView } from '../../shared/view-models/interfaces';
import { WaiterCockpitService } from '../services/waiter-cockpit.service';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';

@Component({
  selector: 'app-cockpit-order-cockpit',
  templateUrl: './order-cockpit.component.html',
  styleUrls: ['./order-cockpit.component.scss'],
})
export class OrderCockpitComponent implements OnInit, OnDestroy {
  private translocoSubscription = Subscription.EMPTY;
  @ViewChild(MatTable) table: MatTable<OrderListView>;

  private pageable: Pageable = {
    pageSize: 8,
    pageNumber: 0,
    // total: 1,
  };
  private sorting: any[] = [];

  pageSize = 8;

  @ViewChild('pagingBar', { static: true }) pagingBar: MatPaginator;

  orders: OrderListView[] = [];
  totalOrders: number;
  columns: any[];

  displayedColumns: string[] = [
    'order.state',
    'booking.bookingDate',
    'booking.email',
    'booking.bookingToken',
    'order.paystate'
  ];

  pageSizes: number[];

  filters: FilterCockpit = {
    bookingDate: undefined,
    email: undefined,
    bookingToken: undefined,
    stateId:[0,1,2]
  };

  stateNames = []
  payStateNames = []

  constructor(
    private dialog: MatDialog,
    private translocoService: TranslocoService,
    private waiterCockpitService: WaiterCockpitService,
    private configService: ConfigService,
  ) {
    this.pageSizes = this.configService.getValues().pageSizes;
  }

  ngOnInit(): void {
    this.applyFilters();
    this.translocoService.langChanges$.subscribe((event: any) => {
      this.setTableHeaders(event);
      this.setStateNames(event);
      this.setPayStateNames(event);
      moment.locale(this.translocoService.getActiveLang());
    });
  }

  setStateNames(lang:string){
    this.translocoSubscription = this.translocoService
    .selectTranslateObject('cockpit.orderStates', {}, lang)
    .subscribe((cockpitTable) => {
      this.stateNames = [
        cockpitTable.orderedH,
        cockpitTable.preparationH,
        cockpitTable.deliveryH,
        cockpitTable.deliveredH,
        cockpitTable.canceledH,
      ];
    });
  }

  setPayStateNames(lang:string){
    this.translocoSubscription = this.translocoService
    .selectTranslateObject('cockpit.orderPayStates', {}, lang)
    .subscribe((cockpitorderPayStates) => {
      this.payStateNames = [
        cockpitorderPayStates.paid,
        cockpitorderPayStates.unpaid
      ];
    });
  }

  setTableHeaders(lang: string): void {
    this.translocoSubscription = this.translocoService
      .selectTranslateObject('cockpit.table', {}, lang)
      .subscribe((cockpitTable) => {
        this.columns = [
          { name: 'order.state', label: cockpitTable.orderStateH },
          { name: 'booking.bookingDate', label: cockpitTable.reservationDateH },
          { name: 'booking.email', label: cockpitTable.emailH },
          { name: 'booking.bookingToken', label: cockpitTable.bookingTokenH },
          { name: 'order.paystate', label: cockpitTable.orderPayStateH }
        ];
      });
  }

  applyFilters(): void {
    this.waiterCockpitService
      .getOrders(this.pageable, this.sorting, this.filters)
      .subscribe((data: any) => {
        if (!data) {
          this.orders = [];
        } else {
          this.orders = data.content;
        }
        this.totalOrders = data.totalElements;
      });
  }

  clearFilters(filters: any): void {
    filters.reset();
    this.applyFilters();
    this.pagingBar.firstPage();
  }

  page(pagingEvent: PageEvent): void {
    this.pageable = {
      pageSize: pagingEvent.pageSize,
      pageNumber: pagingEvent.pageIndex,
      sort: this.pageable.sort,
    };
    this.applyFilters();
  }

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

  changeOrderState(event,element){
    this.waiterCockpitService
      .updateOrder({id:element.order.id, stateId:event.value})
      .subscribe((data) => {
        if (event.value == 3 || event.value == 4){
          this.orders.splice(event.value, 1);
        }
        this.table.renderRows();
      });
  }

  changeOrderPayState(event,element){
    this.waiterCockpitService
      .changeOrderPayState({id:element.order.id, paidId:event.value})
      .subscribe((data) => {
      });
  }

  selected(selection: OrderListView,event:any): void {
    this.dialog.open(OrderDialogComponent, {
      width: '80%',
      data: selection,
    });
  }

  ngOnDestroy(): void {
    this.translocoSubscription.unsubscribe();
  }
}
