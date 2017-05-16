import { Component, OnInit, Inject } from '@angular/core';
import { IPageChangeEvent, ITdDataTableColumn, TdDataTableService } from '@covalent/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'cockpit-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss'],
})
export class ReservationDialogComponent implements OnInit {

  data: any;

  datat: any[] = [{
      dateTime: '09/03/2017 21:00',
      creationdateTime: '09/03/2017 21:00',
      owner: 'owner1',
      email: 'email1@gmail.com',
      tableNumber: 102560,
  }];

  columnst: ITdDataTableColumn[] = [
    { name: 'dateTime', label: 'Reservation date time'},
    { name: 'creationdateTime', label: 'Creation date time'},
    { name: 'owner', label: 'Owner' },
    { name: 'email', label: 'Email' },
    { name: 'tableNumber', label: 'Table'},
  ];

  datao: any[] = [
    { email: 'email1@gmail.com', decision: 'yes'},
    { email: 'email1@gmail.com', decision: 'no'},
    { email: 'email1@gmail.com', decision: ''},
    { email: 'email1@gmail.com', decision: 'yes'},
    { email: 'email1@gmail.com', decision: ''},
    { email: 'email1@gmail.com', decision: 'no'},
    ];

  columnso: ITdDataTableColumn[] = [
    { name: 'email', label: 'Guest email'},
    { name: 'decision', label: 'Acceptances and declines'},
  ];

  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  filteredData: any[] = this.datao;

  constructor(private _dataTableService: TdDataTableService,
              @Inject(MD_DIALOG_DATA) dialogData: any) {
                 this.data = dialogData.row;
  }

  ngOnInit(): void {
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
