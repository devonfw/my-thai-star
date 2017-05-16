import { Component, OnInit, Inject } from '@angular/core';
import { IPageChangeEvent, ITdDataTableColumn, TdDataTableService } from '@covalent/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'cockpit-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit {

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
    { name: 'Pad Kee Mao', comment: 'awdadas das das das ', extra: 'Tofu, Pork', number: '1', price: '6.50€'},
    { name: 'Pad Kee Mao', comment: 'awdadas das das das ', extra: 'Tofu, Pork', number: '1', price: '6.50€'},
    { name: 'Pad Kee Mao', comment: 'awdadas das das das ', extra: 'Tofu, Pork', number: '1', price: '6.50€'},
    { name: 'Pad Kee Mao', comment: 'awdadas das das das ', extra: 'Tofu, Pork', number: '1', price: '6.50€'},
    { name: 'Pad Kee Mao', comment: 'awdadas das das das ', extra: 'Tofu, Pork', number: '1', price: '6.50€'},
    { name: 'Pad Kee Mao', comment: 'awdadas das das das ', extra: 'Tofu, Pork', number: '1', price: '6.50€'},
    { name: 'Pad Kee Mao', comment: 'awdadas das das das ', extra: 'Tofu, Pork', number: '1', price: '6.50€'},
    ];

  columnso: ITdDataTableColumn[] = [
    { name: 'name', label: 'Dish'},
    { name: 'comment', label: 'Comments'},
    { name: 'extra', label: 'Extra' },
    { name: 'number', label: 'Quantity' },
    { name: 'price', label: 'Price'},
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
