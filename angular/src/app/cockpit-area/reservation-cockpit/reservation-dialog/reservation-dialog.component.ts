import { Component, OnInit, Inject } from '@angular/core';
import {
  DataColumn,
  FriendsInvite,
  ReservationView,
} from '../../../shared/view-models/interfaces';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ConfigService } from '../../../core/config/config.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-cockpit-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss'],
})
export class ReservationDialogComponent implements OnInit {
  datao: FriendsInvite[] = [];
  fromRow = 0;
  currentPage = 1;
  pageSize = 4;

  data: ReservationView;
  columnso: DataColumn[] = [
    { name: 'email', label: 'Guest email' },
    { name: 'accepted', label: 'Acceptances and declines' },
  ];
  displayedColumnsO: string[] = ['email', 'accepted'];
  pageSizes: number[];
  datat: ReservationView[] = [];
  columnst: DataColumn[];
  displayedColumnsT: string[] = [
    'bookingDate',
    'creationDate',
    'name',
    'email',
    'tableId',
  ];

  filteredData: FriendsInvite[] = this.datao;

  constructor(
    private translocoService: TranslocoService,
    @Inject(MAT_DIALOG_DATA) dialogData: ReservationView,
    private configService: ConfigService,
  ) {
    this.data = dialogData;
    this.pageSizes = configService.getValues().pageSizesDialog;
  }

  ngOnInit(): void {
    this.translocoService.langChanges$.subscribe((event: string) => {
      this.setTableHeaders(event);
    });

    this.datat.push(this.data);
    this.datao = this.data.invitedGuests;
    this.filter();
  }

  setTableHeaders(lang: string): void {
    this.translocoService
      .selectTranslateObject('cockpit.table', {}, lang)
      .subscribe((cockpitReservationTable) => {
        this.columnst = [
          {
            name: 'booking.bookingDate',
            label: cockpitReservationTable.reservationDateH,
          },
          {
            name: 'booking.creationDate',
            label: cockpitReservationTable.creationDateH,
          },
          { name: 'booking.name', label: cockpitReservationTable.ownerH },
          { name: 'booking.email', label: cockpitReservationTable.emailH },
          { name: 'booking.tableId', label: cockpitReservationTable.tableH },
        ];
      });

    this.translocoService
      .selectTranslateObject('cockpit.reservations.dialogTable', {}, lang)
      .subscribe((cockpitReservationDialogTable) => {
        this.columnso = [
          { name: 'email', label: cockpitReservationDialogTable.guestEmailH },
          {
            name: 'accepted',
            label: cockpitReservationDialogTable.acceptanceH,
          },
        ];

        if (this.data.booking.assistants) {
          this.columnst.push({
            name: 'booking.assistants',
            label: cockpitReservationDialogTable.assistantsH,
          });
          this.displayedColumnsT.push('assistants');
        }
      });
  }

  page(pagingEvent: PageEvent): void {
    this.fromRow = pagingEvent.pageSize * pagingEvent.pageIndex;
    this.currentPage = pagingEvent.pageIndex + 1;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: FriendsInvite[] = this.datao;
    newData = newData.slice(this.fromRow, this.currentPage * this.pageSize);
    setTimeout(() => (this.filteredData = newData));
  }
}
