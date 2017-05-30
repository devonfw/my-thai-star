import { Component, OnInit, Inject } from '@angular/core';
import { IPageChangeEvent, ITdDataTableColumn, TdDataTableService } from '@covalent/core';
import { ExtraView, OrderView, ReservationView, OrderListView, OrderBookingView } from '../../../shared/viewModels/interfaces';
import { OrderCockpitService } from '../shared/order-cockpit.service';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'cockpit-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit {

  datat: any[] = [];
  columnst: ITdDataTableColumn[] = [
    { name: 'bookingDate', label: 'Reservation date'},
    { name: 'creationDate', label: 'Creation date'},
    { name: 'name', label: 'Owner' },
    { name: 'email', label: 'Email' },
    { name: 'tableId', label: 'Table'},
  ];

  datao: any[] = [];
  columnso: ITdDataTableColumn[] = [
    { name: 'dish.name', label: 'Dish'},
    { name: 'orderLine.comment', label: 'Comments'},
    { name: 'extras', label: 'Extra' },
    { name: 'orderLine.amount', label: 'Quantity' },
    { name: 'dish.price', label: 'Price', numeric: true, format: (v: number) => v.toFixed(2)},
  ];

  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  filteredData: OrderView[] = this.datao;
  totalPrice: number;
  data: any;

  constructor(private _dataTableService: TdDataTableService,
              private orderCockpitService: OrderCockpitService,
              @Inject(MD_DIALOG_DATA) dialogData: any) {
                this.data = dialogData.row;
  }

  ngOnInit(): void {
    this.totalPrice = this.orderCockpitService.getTotalPrice(this.data.orderLines);
    this.datao = this.orderCockpitService.orderComposer(this.data.orderLines);
    this.datat.push(this.data.booking);
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
