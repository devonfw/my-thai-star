import { WaiterCockpitService } from '../shared/waiter-cockpit.service';
import { ReservationView } from '../../shared/viewModels/interfaces';
import { Component, OnInit } from '@angular/core';
import {
  ITdDataTableSelectAllEvent,
  IPageChangeEvent,
  ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
} from '@covalent/core';
import { MatDialog } from '@angular/material';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import { config } from '../../config';
import { FilterCockpit, Sorting, Pagination } from '../../shared/backendModels/interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cockpit-reservation-cockpit',
  templateUrl: './reservation-cockpit.component.html',
  styleUrls: ['./reservation-cockpit.component.scss'],
})
export class ReservationCockpitComponent implements OnInit {

  private sorting: Sorting[] = [];

  pagination: Pagination = {
    size: 8,
    page: 1,
    total: 1,
  };

  reservations: ReservationView;
  totalReservations: number;

  columns: ITdDataTableColumn[];

  pageSizes: number[] = config.pageSizes;

  filters: FilterCockpit = {
    bookingDate: undefined,
    email: undefined,
    bookingToken: undefined,
  };

  constructor(private waiterCockpitService: WaiterCockpitService,
              private translate: TranslateService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.translate.get('cockpit.table').subscribe((res: any) => {
      this.columns = [
        { name: 'booking.bookingDate', label: res.reservationDateH },
        { name: 'booking.email', label: res.emailH },
        { name: 'booking.bookingToken', label: res.bookingTokenH },
      ];
    });
    this.applyFilters();
  }

  filter(): void {
    this.pagination.page = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    this.waiterCockpitService.getReservations(this.pagination, this.sorting, this.filters)
      .subscribe((data: any) => {
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
    this.sorting = [];
    this.sorting.push({ 'name': sortEvent.name.split('.').pop(), 'direction': '' + sortEvent.order });
    this.applyFilters();
  }

  selected(selection: ITdDataTableSelectAllEvent): void {
    this.dialog.open(ReservationDialogComponent, {
      width: '80%',
      data: selection,
    });
  }
}
