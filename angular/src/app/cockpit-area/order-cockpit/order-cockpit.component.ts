import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TdDataTableService,
         TdDataTableSortingOrder,
         ITdDataTableSelectAllEvent,
         ITdDataTableSortChangeEvent,
         IPageChangeEvent,
         ITdDataTableColumn } from '@covalent/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { OrderDialogComponent } from 'app/cockpit-area/order-cockpit/order-dialog/order-dialog.component';
import { OrderCockpitService } from './shared/order-cockpit.service';
import { ReservationView } from '../../shared/viewModels/interfaces';

@Component({
  selector: 'cockpit-order-cockpit',
  templateUrl: './order-cockpit.component.html',
  styleUrls: ['./order-cockpit.component.scss'],
})
export class OrderCockpitComponent implements OnInit {

  data: ReservationView[];
  columns: ITdDataTableColumn[] = [
    { name: 'date', label: 'Reservation date'},
    { name: 'email', label: 'Email' },
    { name: 'bookingId', label: 'Reference number'},
  ];

  filteredData: ReservationView[];
  filteredTotal: number;

  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 8;
  sortBy: string = 'date';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private _dataTableService: TdDataTableService,
              private dialog: MdDialog,
              private orderCockpitService: OrderCockpitService) {}

  ngOnInit(): void {
    this.orderCockpitService.getBookingOrders().subscribe((orders: ReservationView[]) => {
      this.data = orders;
      this.filteredData = orders;
      this.filteredTotal = orders.length;
    });
    this.filter();
  }

  applyFilters(filters: FormGroup): void {
    // apply the filters
  }

  clearFilters(): void {
    // clear the filters
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
