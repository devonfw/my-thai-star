import { Component, OnInit, Inject } from '@angular/core';
import {
  IPageChangeEvent,
  ITdDataTableColumn,
  TdDataTableService,
} from '@covalent/core';
import {
  FriendsInvite,
  ReservationView,
} from '../../../shared/view-models/interfaces';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { ConfigService } from '../../../core/config/config.service';

/* @export
 * @class ReservationDialogComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'cockpit-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss'],
})
export class ReservationDialogComponent implements OnInit {
  datao: FriendsInvite[] = [];
  fromRow = 1;
  currentPage = 1;
  pageSize = 4;

  data: any;
  columnso: ITdDataTableColumn[] = [
    { name: 'email', label: 'Guest email' },
    { name: 'accepted', label: 'Acceptances and declines' },
  ];
  pageSizes: number[];
  datat: ReservationView[] = [];
  columnst: ITdDataTableColumn[];

  filteredData: any[] = this.datao;

  /* Creates an instance of ReservationDialogComponent.
   * @param {TdDataTableService} _dataTableService
   * @param {TranslateService} translate
   * @param {*} dialogData
   * @param {ConfigService} configService
   * @memberof ReservationDialogComponent
   */
  constructor(
    private _dataTableService: TdDataTableService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) dialogData: any,
    private configService: ConfigService,
  ) {
    this.data = dialogData.row;
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
        }
      });
  }

  /* @param {IPageChangeEvent} pagingEvent
   * @memberof ReservationDialogComponent
   */
  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.datao;
    newData = this._dataTableService.pageData(
      newData,
      this.fromRow,
      this.currentPage * this.pageSize,
    );
    setTimeout(() => (this.filteredData = newData));
  }
}
