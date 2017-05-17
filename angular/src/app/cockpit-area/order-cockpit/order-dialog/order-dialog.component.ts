import { Component, OnInit, Inject } from '@angular/core';
import { IPageChangeEvent, ITdDataTableColumn, TdDataTableService } from '@covalent/core';
import { ExtraView, OrderView, ReservationView } from '../../../shared/models/interfaces';
import { OrderCockpitService } from '../shared/order-cockpit.service';
import { PriceCalculatorService } from '../../../sidenav/shared/price-calculator.service';
import {MD_DIALOG_DATA} from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'cockpit-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit {

  columnst: ITdDataTableColumn[] = [
    { name: 'date', label: 'Reservation date'},
    { name: 'hour', label: 'Reservation hour'},
    { name: 'creationDate', label: 'Creation date'},
    { name: 'creationHour', label: 'Creation time'},
    { name: 'nameOwner', label: 'Owner' },
    { name: 'emailOwner', label: 'Email' },
    { name: 'reservationId', label: 'Table'},
  ];

  columnso: ITdDataTableColumn[] = [
    { name: 'orderName', label: 'Dish'},
    { name: 'comment', label: 'Comments'},
    { name: 'options', label: 'Extra' },
    { name: 'number', label: 'Quantity' },
    { name: 'price', label: 'Price'},
  ];

  reservationId: number;
  datao: OrderView[] = [];

  datat: ReservationView[] = [];

  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  filteredData: any[] = this.datao;

  constructor(private _dataTableService: TdDataTableService,
              private priceCalculator: PriceCalculatorService,
              private orderCockpitService: OrderCockpitService,
              @Inject(MD_DIALOG_DATA) dialogData: any) {
                 this.reservationId = dialogData.row.reservationId;
  }

  ngOnInit(): void {
    this.orderCockpitService.getOrder(this.reservationId).subscribe( (order: ReservationView) => {
      this.datat.push(order);
      this.datao = JSON.parse(JSON.stringify(order.orders));
      _.map(this.datao, (o: OrderView) => {
        o.price = this.priceCalculator.getPrice(o);
        if (o.options.constructor === Array) {
          o.options = _.reduce(o.options, (result: string, opt: ExtraView) => {
            return result + ' ' + opt.name + ',';
          }, '').slice(0, -1);
        }
      });
    });
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

  calculateTotal(): number {
    return this.priceCalculator.getTotalPrice(this.datao);
  }

}
