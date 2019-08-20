import { Component, OnInit, Inject } from '@angular/core';
import { OrderView, BookingView } from '../../../shared/view-models/interfaces';
import { WaiterCockpitService } from '../../shared/waiter-cockpit.service';
import { MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { ConfigService } from '../../../core/config/config.service';

@Component({
  selector: 'cockpit-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit {
  private fromRow = 0;
  private currentPage = 1;

  pageSize = 4;

  data: any;
  datat: BookingView[] = [];
  columnst: any[];
  displayedColumnsT: string[] = ['bookingDate', 'creationDate', 'name', 'email', 'tableId'];

  datao: OrderView[] = [];
  columnso: any[];
  displayedColumnsO: string[] = ['dish.name', 'orderLine.comment', 'extras', 'orderLine.amount', 'dish.price'];

  pageSizes: number[];
  filteredData: OrderView[] = this.datao;
  totalPrice: number;

  constructor(
    private waiterCockpitService: WaiterCockpitService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) dialogData: any,
    private configService: ConfigService
  ) {
    this.data = dialogData;
    this.pageSizes = this.configService.getValues().pageSizesDialog;
  }

  ngOnInit(): void {
    this.setTableHeaders();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTableHeaders();
    });

    this.totalPrice = this.waiterCockpitService.getTotalPrice(
      this.data.orderLines,
    );
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
        {
          name: 'dish.price',
          label: res.priceH,
          numeric: true,
          format: (v: number) => v.toFixed(2),
        },
      ];
    });
  }

  page(pagingEvent: PageEvent): void {
    this.currentPage = pagingEvent.pageIndex + 1;
    this.pageSize = pagingEvent.pageSize;
    this.fromRow = pagingEvent.pageSize * pagingEvent.pageIndex;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.datao;
    newData = newData.slice(this.fromRow, this.currentPage * this.pageSize);
    setTimeout(() => (this.filteredData = newData));
  }
}
