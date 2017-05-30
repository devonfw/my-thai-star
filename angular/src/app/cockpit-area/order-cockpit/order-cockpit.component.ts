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
import { FilterCockpitView, ReservationView, OrderListView } from '../../shared/viewModels/interfaces';

@Component({
  selector: 'cockpit-order-cockpit',
  templateUrl: './order-cockpit.component.html',
  styleUrls: ['./order-cockpit.component.scss'],
})
export class OrderCockpitComponent implements OnInit {

  data: any[];
  columns: ITdDataTableColumn[] = [
    { name: 'booking.bookingDate', label: 'Reservation date'},
    { name: 'booking.email', label: 'Email' },
    { name: 'order.id', label: 'Reference number'},
  ];

  filteredData: any[];
  filteredTotal: number;

  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 8;
  sortBy: string = 'booking.bookingDate';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private _dataTableService: TdDataTableService,
              private dialog: MdDialog,
              private orderCockpitService: OrderCockpitService) {}

  ngOnInit(): void {
    this.orderCockpitService.getBookingOrders({date: undefined, email: undefined, bookingId: undefined}).subscribe((orders: any) => {
      this.data = orders.result;
      this.filteredData = orders.result;
      this.filteredTotal = orders.result.length;
      this.filter();
    });
  }

  applyFilters(filters: FilterCockpitView): void {
    this.orderCockpitService.getBookingOrders(filters).subscribe((orders: any) => {
      this.data = orders.result;
      this.filteredData = orders.result;
      this.filteredTotal = orders.result.length;
    });
  }

  clearFilters(filters: any): void {
    filters.reset();
    this.orderCockpitService.getBookingOrders({date: undefined, email: undefined, bookingId: undefined}).subscribe((orders: any) => {
      this.data = orders.result;
      this.filteredData = orders.result;
      this.filteredTotal = orders.result.length;
    });
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.data;
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

  selected(selection: ITdDataTableSelectAllEvent): void {
    let dialogRef: MdDialogRef<OrderDialogComponent> = this.dialog.open(OrderDialogComponent, {
      width: '80%',
      data: selection,
    });
  }
}
