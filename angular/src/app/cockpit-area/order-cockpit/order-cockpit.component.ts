import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IPageChangeEvent,
         ITdDataTableSelectAllEvent,
         ITdDataTableColumn } from '@covalent/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { WaiterCockpitService } from '../shared/waiter-cockpit.service';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { ReservationView, OrderListView } from '../../shared/viewModels/interfaces';
import { FilterCockpit, Pagination } from '../../shared/backend/backendModels/interfaces';

@Component({
  selector: 'cockpit-order-cockpit',
  templateUrl: './order-cockpit.component.html',
  styleUrls: ['./order-cockpit.component.scss'],
})
export class OrderCockpitComponent implements OnInit {

  data: OrderListView[];
  dataTotal: number;
  columns: ITdDataTableColumn[] = [
    { name: 'booking.bookingDate', label: 'Reservation date'},
    { name: 'booking.email', label: 'Email' },
    { name: 'booking.bookingToken', label: 'Reference number'},
  ];

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

  constructor(private dialog: MdDialog,
              private waiterCockpitService: WaiterCockpitService) {}

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.waiterCockpitService.getOrders(this.pagination, this.filters).subscribe((orders: any) => {
      this.data = orders.result;
      this.dataTotal = orders.pagination.total;
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

  selected(selection: ITdDataTableSelectAllEvent): void {
    let dialogRef: MdDialogRef<OrderDialogComponent> = this.dialog.open(OrderDialogComponent, {
      width: '80%',
      data: selection,
    });
  }
}
