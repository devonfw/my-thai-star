import { Component, OnInit, Inject } from '@angular/core';
import {
  FriendsInvite,
  ReservationView,
} from '../../../shared/view-models/interfaces';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { ConfigService } from '../../../core/config/config.service';

@Component({
  selector: 'cockpit-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss'],
})
export class ReservationDialogComponent implements OnInit {
  datao: FriendsInvite[] = [];
  fromRow = 0;
  currentPage = 1;
  pageSize = 4;

  data: any;
  columnso: any[] = [
    { name: 'email', label: 'Guest email' },
    { name: 'accepted', label: 'Acceptances and declines' },
  ];
  displayedColumnsO: string[] = ['email', 'accepted'];
  pageSizes: number[];
  datat: ReservationView[] = [];
  columnst: any[];
  displayedColumnsT: string[] = ['bookingDate', 'creationDate', 'name', 'email', 'tableId'];

  filteredData: any[] = this.datao;

  constructor(
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) dialogData: any,
    private configService: ConfigService
  ) {
    this.data = dialogData;
    this.pageSizes = configService.getValues().pageSizesDialog;
  }

  ngOnInit(): void {
    this.setTableHeaders();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTableHeaders();
    });

    this.datat.push(this.data);
    this.datao = this.data.invitedGuests;
    this.filter();
  }

  setTableHeaders(): void {
    this.translate.get('cockpit.table').subscribe((res: any) => {
      this.columnst = [
        { name: 'booking.bookingDate', label: res.reservationDateH },
        { name: 'booking.creationDate', label: res.creationDateH },
        { name: 'booking.name', label: res.ownerH },
        { name: 'booking.email', label: res.emailH },
        { name: 'booking.tableId', label: res.tableH },
      ];
    });

    this.translate
      .get('cockpit.reservations.dialogTable')
      .subscribe((res: any) => {
        this.columnso = [
          { name: 'email', label: res.guestEmailH },
          { name: 'accepted', label: res.acceptanceH },
        ];

        if (this.data.booking.assistants) {
          this.columnst.push({
            name: 'booking.assistants',
            label: res.assistantsH,
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
    let newData: any[] = this.datao;
    newData = newData.slice(this.fromRow, this.currentPage * this.pageSize);
    setTimeout(() => (this.filteredData = newData));
  }
}
