import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TdDataTableService,
         TdDataTableSortingOrder,
         ITdDataTableSelectAllEvent,
         ITdDataTableSortChangeEvent,
         IPageChangeEvent,
         ITdDataTableColumn } from '@covalent/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { OrderCockpitService } from './shared/order-cockpit.service';
import { ReservationView, OrderListView } from '../../shared/viewModels/interfaces';
import { FilterCockpit, Pagination } from '../../shared/backend/backendModels/interfaces';

@Component({
  selector: 'cockpit-order-cockpit',
  templateUrl: './order-cockpit.component.html',
  styleUrls: ['./order-cockpit.component.scss'],
})
export class OrderCockpitComponent implements OnInit {

  data: OrderListView[];
  columns: ITdDataTableColumn[] = [
    { name: 'booking.bookingDate', label: 'Reservation date'},
    { name: 'booking.email', label: 'Email' },
    { name: 'booking.bookingToken', label: 'Reference number'},
  ];

  filteredData: OrderListView[];
  filteredTotal: number;
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

  sortBy: string = 'booking.bookingDate';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private _dataTableService: TdDataTableService,
              private dialog: MdDialog,
              private orderCockpitService: OrderCockpitService) {}

  ngOnInit(): void {
    this.applyFilters();
  }

  filter(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.orderCockpitService.getBookingOrders(this.pagination, this.filters).subscribe((orders: any) => {
      this.data = orders.result;
      this.filteredData = orders.result;
      this.filteredTotal = orders.pagination.total;
      this.dataFilter();
    });
  }

  clearFilters(filters: any): void {
    filters.reset();
    this.applyFilters();
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.dataFilter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.pagination = {
      size: pagingEvent.pageSize,
      page: pagingEvent.page,
      total: 1,
    };
    this.applyFilters();
  }

  dataFilter(): void {
    let newData: any[] = this.data;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    this.filteredData = newData;
  }

  selected(selection: ITdDataTableSelectAllEvent): void {
    let dialogRef: MdDialogRef<OrderDialogComponent> = this.dialog.open(OrderDialogComponent, {
      width: '80%',
      data: selection,
    });
  }
}
