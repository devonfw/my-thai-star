import { Component, OnInit } from '@angular/core';
import {
  IPageChangeEvent,
  ITdDataTableSelectAllEvent,
  ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
} from '@covalent/core';
import { MatDialog } from '@angular/material';
import { WaiterCockpitService } from '../shared/waiter-cockpit.service';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { OrderListView } from '../../shared/viewModels/interfaces';
import { config } from '../../config';
import { Pagination, FilterCockpit } from '../../shared/backendModels/interfaces';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'cockpit-order-cockpit',
  templateUrl: './order-cockpit.component.html',
  styleUrls: ['./order-cockpit.component.scss'],
})
export class OrderCockpitComponent implements OnInit {

  private pagination: Pagination = {
    size: 8,
    page: 1,
    total: 1,
  };
  private sorting: any[] = [];

  pageSize: number = 8;

  orders: OrderListView[];
  totalOrders: number;

  columns: ITdDataTableColumn[];

  pageSizes: number[] = config.pageSizes;

  filters: FilterCockpit = {
    bookingDate: undefined,
    email: undefined,
    bookingToken: undefined,
  };

  constructor(private dialog: MatDialog,
    private translate: TranslateService,
    private waiterCockpitService: WaiterCockpitService) { }

  ngOnInit(): void {
    this.applyFilters();
    this.setTableHeaders();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTableHeaders();
      moment.locale(this.translate.currentLang);
    });
  }

  setTableHeaders(): void {
    this.translate.get('cockpit.table').subscribe((res: any) => {
      this.columns = [
        { name: 'booking.bookingDate', label: res.reservationDateH },
        { name: 'booking.email', label: res.emailH },
        { name: 'booking.bookingToken', label: res.bookingTokenH },
      ];
    });
  }

  applyFilters(): void {
    this.waiterCockpitService.getOrders(this.pagination, this.sorting, this.filters)
      .subscribe((data: any) => {
        this.orders = data.result;
        this.totalOrders = data.pagination.total;
      });
  }

  clearFilters(filters: any): void {
    filters.reset();
    this.applyFilters();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.pagination = {
      size: pagingEvent.pageSize,
      page: pagingEvent.page,
      total: 1,
    };
    this.applyFilters();
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sorting = [];
    this.sorting.push({ 'name': sortEvent.name.split('.').pop(), 'direction': '' + sortEvent.order });
    this.applyFilters();
  }

  selected(selection: ITdDataTableSelectAllEvent): void {
    this.dialog.open(OrderDialogComponent, {
      width: '80%',
      data: selection,
    });
  }
}
