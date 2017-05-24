import { Component, OnInit, Inject } from '@angular/core';
import { IPageChangeEvent, ITdDataTableColumn, TdDataTableService } from '@covalent/core';
import { ExtraView, OrderView, ReservationView } from '../../../shared/viewModels/interfaces';
import { OrderCockpitService } from '../shared/order-cockpit.service';
import { PriceCalculatorService } from '../../../sidenav/shared/price-calculator.service';
import {MD_DIALOG_DATA} from '@angular/material';
import {map, cloneDeep} from 'lodash';

@Component({
  selector: 'cockpit-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit {

  datat: ReservationView[] = [];
  columnst: ITdDataTableColumn[] = [
    { name: 'date', label: 'Reservation date'},
    { name: 'creationDate', label: 'Creation date'},
    { name: 'assistants', label: 'Assistants'},
    { name: 'name', label: 'Owner' },
    { name: 'email', label: 'Email' },
    { name: 'tableId', label: 'Table'},
  ];

  datao: OrderView[] = [];
  columnso: ITdDataTableColumn[] = [
    { name: 'name', label: 'Dish'},
    { name: 'comment', label: 'Comments'},
    { name: 'extras', label: 'Extra' },
    { name: 'amount', label: 'Quantity' },
    { name: 'price', label: 'Price', numeric: true, format: (v: number) => v.toFixed(2)},
  ];

  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  filteredData: OrderView[] = this.datao;
  totalPrice: number;
  bookingId: number;

  constructor(private _dataTableService: TdDataTableService,
              private priceCalculator: PriceCalculatorService,
              private orderCockpitService: OrderCockpitService,
              @Inject(MD_DIALOG_DATA) dialogData: any) {
                this.bookingId = dialogData.row.bookingId;
  }

  ngOnInit(): void {

    // Remark: Maybe total price calculation can be also moved to a service, so price calculator dependency will
    // be present only in that service
    // Remark: this logic should be moved to a service - e.g. OrderCockpitService should do it for now
    this.orderCockpitService.getBookingOrder(this.bookingId).subscribe( (order: ReservationView) => {
      this.datat.push(order);
      this.datao = cloneDeep(order.orders);
      this.totalPrice = this.priceCalculator.getTotalPrice(order.orders);
      map(this.datao, (o: OrderView) => {
        o.price = this.priceCalculator.getPrice(o);
        o.extras = map(o.extras, 'name').join(', ');
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
}
