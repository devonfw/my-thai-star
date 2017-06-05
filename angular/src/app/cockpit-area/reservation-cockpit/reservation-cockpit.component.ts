import { WaiterCockpitService } from '../shared/waiter-cockpit.service';
import { FilterCockpit, Pagination } from '../../shared/backend/backendModels/interfaces';
import { ReservationView } from '../../shared/viewModels/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITdDataTableSelectAllEvent,
         IPageChangeEvent,
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
    this.waiterCockpitService.getReservations(this.pagination, this.filters).subscribe((reservations: any) => {
      this.data = reservations.result;
      this.filteredData = reservations.result;
      this.filteredTotal = reservations.pagination.total;
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
    let dialogRef: MdDialogRef<ReservationDialogComponent> = this.dialog.open(ReservationDialogComponent, {
      width: '80%',
      data: selection,
    });
  }

}
