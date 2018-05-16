import { Component, OnInit, Inject } from '@angular/core';
import { IPageChangeEvent, ITdDataTableColumn, TdDataTableService } from '@covalent/core';
import { OrderView, BookingView } from '../../../shared/viewModels/interfaces';
import { WaiterCockpitService } from '../../shared/waiter-cockpit.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { config } from '../../../config';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'cockpit-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit {

  private fromRow: number = 1;
  private currentPage: number = 1;

  pageSize: number = 4;

  data: any;
  datat: BookingView[] = [];
  columnst: ITdDataTableColumn[];

  datao: OrderView[] = [];
  columnso: ITdDataTableColumn[];

  pageSizes: number[] = config.pageSizesDialog;
  filteredData: OrderView[] = this.datao;
  totalPrice: number;

  constructor(private _dataTableService: TdDataTableService,
    private waiterCockpitService: WaiterCockpitService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) dialogData: any) {
    this.data = dialogData.row;
  }

  ngOnInit(): void {

    this.setTableHeaders();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTableHeaders();
    });

    this.totalPrice = this.waiterCockpitService.getTotalPrice(this.data.orderLines);
    this.datao = this.waiterCockpitService.orderComposer(this.data.orderLines);
    this.datat.push(this.data.booking);
    this.filter();
  }

  setTableHeaders(): void {
    this.translate.get('cockpit.table').subscribe((res: any) => {
      this.columnst = [
        { name: 'bookingDate', label: res.reservationDateH },
        { name: 'creationDate', label: res.creationDateH },
        { name: 'name', label: res.ownerH },
        { name: 'email', label: res.emailH },
        { name: 'tableId', label: res.tableH },
      ];
    });

    this.translate.get('cockpit.orders.dialogTable').subscribe((res: any) => {
      this.columnso = [
        { name: 'dish.name', label: res.dishH },
        { name: 'orderLine.comment', label: res.commentsH },
        { name: 'extras', label: res.extrasH },
        { name: 'orderLine.amount', label: res.quantityH },
        { name: 'dish.price', label: res.priceH, numeric: true, format: (v: number) => v.toFixed(2) },
      ];
    });
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
    setTimeout(() => this.filteredData = newData);
  }
}
