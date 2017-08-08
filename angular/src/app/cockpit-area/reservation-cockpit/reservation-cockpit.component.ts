import { WaiterCockpitService } from '../shared/waiter-cockpit.service';
import { FilterCockpit, Pagination, Sorting } from '../../backend/backendModels/interfaces';
import { ReservationView } from '../../shared/viewModels/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITdDataTableSelectAllEvent,
         IPageChangeEvent,
         ITdDataTableColumn,
         ITdDataTableSortChangeEvent,
         TdDataTableSortingOrder } from '@covalent/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import { reject } from 'lodash';
import { config } from '../../config';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cockpit-reservation-cockpit',
  templateUrl: './reservation-cockpit.component.html',
  styleUrls: ['./reservation-cockpit.component.scss'],
})
export class ReservationCockpitComponent implements OnInit {

  reservations: ReservationView;
  totalReservations: number;

  columns: ITdDataTableColumn[] = [
    { name: 'booking.bookingDate', label: 'Reservation date'},
    { name: 'booking.email', label: 'Email' },
    { name: 'booking.bookingToken', label: 'Reference number'},
  ];

  pageSizes: number[] = config.pageSizes;

  filters: FilterCockpit = {
    bookingDate: undefined,
    email: undefined,
    bookingToken: undefined,
  };

  pagination: Pagination = {
    size: 8,
    page: 1,
    total: 1,
  };

  sorting: Sorting[] = [];

  constructor(private waiterCockpitService: WaiterCockpitService,
              private dialog: MdDialog) {}

  ngOnInit(): void {
    this.applyFilters();
  }

  filter(): void {
    this.pagination.page = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    this.waiterCockpitService.getReservations(this.pagination, this.sorting, this.filters)
        .subscribe( (data: any) => {
          this.reservations = data.result;
          this.totalReservations = data.pagination.total;
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
    let dialogRef: MdDialogRef<ReservationDialogComponent> = this.dialog.open(ReservationDialogComponent, {
      width: '80%',
      data: selection,
    });
  }

}
