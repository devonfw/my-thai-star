import { ReservationCockpitService } from './shared/reservation-cockpit.service';
import { FilterCockpitView, ReservationView } from '../../shared/viewModels/interfaces';
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

  constructor(private reservationCockpitService: ReservationCockpitService,
              private _dataTableService: TdDataTableService,
              private dialog: MdDialog) {}

  ngOnInit(): void {
    this.reservationCockpitService.getReservations({date: undefined, email: undefined, bookingId: undefined})
        .subscribe((reservations: ReservationView[]) => {
          this.data = reservations;
          this.filteredData = reservations;
          this.filteredTotal = reservations.length;
        });
    this.filter();
  }

  applyFilters(filters: any): void {
    this.reservationCockpitService.getReservations(filters).subscribe((orders: ReservationView[]) => {
      this.data = orders;
      this.filteredData = orders;
      this.filteredTotal = orders.length;
    });
  }

  clearFilters(filters: any): void {
    filters.reset();
    this.reservationCockpitService.getReservations({date: undefined, email: undefined, bookingId: undefined})
        .subscribe((orders: ReservationView[]) => {
          this.data = orders;
          this.filteredData = orders;
          this.filteredTotal = orders.length;
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
    let dialogRef: MdDialogRef<ReservationDialogComponent> = this.dialog.open(ReservationDialogComponent, {
      width: '80%',
      data: selection,
    });
  }

}
