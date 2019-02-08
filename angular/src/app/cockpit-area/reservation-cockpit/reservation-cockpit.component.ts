import { WaiterCockpitService } from '../shared/waiter-cockpit.service';
import { ReservationView } from '../../shared/view-models/interfaces';
import { Component, OnInit } from '@angular/core';
import {
  ITdDataTableSelectAllEvent,
  IPageChangeEvent,
  ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
} from '@covalent/core';
import { MatDialog } from '@angular/material';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import {
  FilterCockpit,
  Sort,
  Pageable,
} from '../../shared/backend-models/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import * as moment from 'moment';
import { ConfigService } from '../../core/config/config.service';

/* @export
 * @class ReservationCockpitComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'cockpit-reservation-cockpit',
  templateUrl: './reservation-cockpit.component.html',
  styleUrls: ['./reservation-cockpit.component.scss'],
})
export class ReservationCockpitComponent implements OnInit {
  private sorting: Sort[] = [];

  pageable: Pageable = {
    pageSize: 8,
    pageNumber: 0,
    // total: 1,
  };

  reservations: ReservationView[];
  totalReservations: number;

  columns: ITdDataTableColumn[];

  pageSizes: number[];

  filters: FilterCockpit = {
    bookingDate: undefined,
    email: undefined,
    bookingToken: undefined,
  };

  /* Creates an instance of ReservationCockpitComponent.
   * @param {WaiterCockpitService} waiterCockpitService
   * @param {TranslateService} translate
   * @param {MatDialog} dialog
   * @param {ConfigService} configService
   * @memberof ReservationCockpitComponent
   */
  constructor(
    private waiterCockpitService: WaiterCockpitService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private configService: ConfigService,
  ) {
    this.pageSizes = this.configService.getValues().pageSizes;
  }

  ngOnInit(): void {
    this.setTableHeaders();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTableHeaders();
      moment.locale(this.translate.currentLang);
    });
    this.applyFilters();
  }

  setTableHeaders(): void {
    this.translate.get('cockpit.table').subscribe((res: any) => {
      this.columns = [
        { name: 'booking.bookingDate', label: res.reservationDateH },
        { name: 'booking.email', label: res.emailH },
        { name: 'booking.bookingToken', label: res.bookingTokenH },
      ];
    });
  }

  filter(): void {
    this.pageable.pageNumber = 0;
    this.applyFilters();
  }

  applyFilters(): void {
    this.waiterCockpitService
      .getReservations(this.pageable, this.sorting, this.filters)
      .subscribe((data: any) => {
        if (!data) {
          this.reservations = [];
        } else {
          this.reservations = data.content;
        }
        this.totalReservations = data.totalElements;
      });
  }

  /* @param {*} filters
   * @memberof ReservationCockpitComponent
   */
  clearFilters(filters: any): void {
    filters.reset();
    this.applyFilters();
  }

  /* @param {IPageChangeEvent} pagingEvent
   * @memberof ReservationCockpitComponent
   */
  page(pagingEvent: IPageChangeEvent): void {
    this.pageable = {
      pageSize: pagingEvent.pageSize,
      pageNumber: pagingEvent.page - 1,
      sort: this.pageable.sort,
      // total: 1,
    };
    this.applyFilters();
  }

  /* @param {ITdDataTableSortChangeEvent} sortEvent
   * @memberof ReservationCockpitComponent
   */
  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sorting = [];
    this.sorting.push({
      property: sortEvent.name.split('.').pop(),
      direction: '' + sortEvent.order,
    });
    this.applyFilters();
  }

  /* @param {ITdDataTableSelectAllEvent} selection
   * @memberof ReservationCockpitComponent
   */
  selected(selection: ITdDataTableSelectAllEvent): void {
    this.dialog.open(ReservationDialogComponent, {
      width: '80%',
      data: selection,
    });
  }
}
