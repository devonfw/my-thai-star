import { Component, OnInit, Inject } from '@angular/core';
import { IPageChangeEvent, ITdDataTableColumn, TdDataTableService } from '@covalent/core';
import { FriendsInvite, ReservationView } from '../../../shared/viewModels/interfaces';
import { WaiterCockpitService } from '../../shared/waiter-cockpit.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { config } from '../../../config';

@Component({
  selector: 'cockpit-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss'],
})
export class ReservationDialogComponent implements OnInit {

  private data: any;

  private datat: ReservationView[] = [];
  private columnst: ITdDataTableColumn[] = [
    { name: 'booking.bookingDate', label: 'Reservation date'},
    { name: 'booking.creationDate', label: 'Creation date'},
    { name: 'booking.name', label: 'Owner' },
    { name: 'booking.email', label: 'Email' },
    { name: 'booking.tableId', label: 'Table'},
  ];

  private datao: FriendsInvite[] = [];
  private columnso: ITdDataTableColumn[] = [
    { name: 'email', label: 'Guest email'},
    { name: 'accepted', label: 'Acceptances and declines'},
  ];

  private pageSizes: number[] = config.pageSizesDialog;

  private fromRow: number = 1;
  private currentPage: number = 1;
  private pageSize: number = 5;
  private filteredData: any[] = this.datao;

  constructor(private _dataTableService: TdDataTableService,
              private waiterCockpitService: WaiterCockpitService,
              @Inject(MD_DIALOG_DATA) dialogData: any) {
                 this.data = dialogData.row;
  }

  ngOnInit(): void {
    this.datat.push(this.data);
    this.datao = this.data.invitedGuests;
    if (this.data.booking.assistants) {
      this.columnst.push({ name: 'booking.assistants', label: 'Assistants'});
    }
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.datao;
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

}
