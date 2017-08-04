import { Component, OnInit } from '@angular/core';
import { IPageChangeEvent,
         ITdDataTableSelectAllEvent,
         ITdDataTableColumn,
         ITdDataTableSortChangeEvent} from '@covalent/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { WaiterCockpitService } from '../shared/waiter-cockpit.service';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { OrderListView } from '../../shared/viewModels/interfaces';
import { FilterCockpit, Pagination } from '../../backend/backendModels/interfaces';
import { reject } from 'lodash';
import { config } from '../../config';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cockpit-order-cockpit',
  templateUrl: './order-cockpit.component.html',
  styleUrls: ['./order-cockpit.component.scss'],
})
export class OrderCockpitComponent implements OnInit {

  orders: OrderListView[];
  totalOrders: number;

  columns: ITdDataTableColumn[] = [
    { name: 'booking.bookingDate', label: 'Reservation date'},
    { name: 'booking.email', label: 'Email' },
    { name: 'booking.bookingToken', label: 'Reference number'},
  ];

  pageSizes: number[] = config.pageSizes;

  pagination: Pagination = {
    size: 8,
    page: 1,
    total: 1,
  };

  filters: FilterCockpit = {
    bookingDate: undefined,
    email: undefined,
    bookingToken: undefined,
  };

  sorting: any[] = [];

  constructor(private dialog: MdDialog,
              private waiterCockpitService: WaiterCockpitService) {}

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.waiterCockpitService.getOrders(this.pagination, this.sorting, this.filters)
        .subscribe( (data: any) => {
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
    this.sorting = reject(this.sorting, { 'name': sortEvent.name.split('.').pop() });
    this.sorting.push({'name': sortEvent.name.split('.').pop(), 'direction': '' + sortEvent.order});
    this.applyFilters();
  }

  selected(selection: ITdDataTableSelectAllEvent): void {
    let dialogRef: MdDialogRef<OrderDialogComponent> = this.dialog.open(OrderDialogComponent, {
      width: '80%',
      data: selection,
    });
  }
}
