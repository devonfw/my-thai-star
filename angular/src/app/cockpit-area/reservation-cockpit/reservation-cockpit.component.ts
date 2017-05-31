import { FilterCockpit, Pagination } from '../../shared/backend/backendModels/interfaces';
import { ReservationCockpitService } from './shared/reservation-cockpit.service';
import { ReservationView } from '../../shared/viewModels/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TdDataTableService,
         ITdDataTableSelectAllEvent,
         TdDataTableSortingOrder,
         IPageChangeEvent,
         ITdDataTableSortChangeEvent,
         ITdDataTableColumn } from '@covalent/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';

@Component({
  selector: 'cockpit-reservation-cockpit',
  templateUrl: './reservation-cockpit.component.html',
  styleUrls: ['./reservation-cockpit.component.scss'],
})
export class ReservationCockpitComponent implements OnInit {

  data: ReservationView[];

  columns: ITdDataTableColumn[] = [
    { name: 'booking.bookingDate', label: 'Reservation date'},
    { name: 'booking.email', label: 'Email' },
    { name: 'booking.bookingToken', label: 'Reference number'},
  ];

  filteredData: ReservationView[];
  filteredTotal: number;

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

  sortBy: string = 'booking.bookingDate';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private reservationCockpitService: ReservationCockpitService,
              private _dataTableService: TdDataTableService,
              private dialog: MdDialog) {}

  ngOnInit(): void {
    this.applyFilters();
  }

  filter(): void {
    this.pagination.page = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    this.reservationCockpitService.getReservations(this.pagination, this.filters).subscribe((reservations: any) => {
      this.data = reservations.result;
      this.filteredData = reservations.result;
      this.filteredTotal = reservations.pagination.total;
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
    let dialogRef: MdDialogRef<ReservationDialogComponent> = this.dialog.open(ReservationDialogComponent, {
      width: '80%',
      data: selection,
    });
  }

}
