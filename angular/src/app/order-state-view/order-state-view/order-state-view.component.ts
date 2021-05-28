import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { forkJoin, interval, Observable } from 'rxjs';
import { OrderService } from './order.service';
import { TranslocoService } from '@ngneat/transloco';
import { ViewChild } from '@angular/core'
import { MatHorizontalStepper } from '@angular/material/stepper'
import { AddressView, OrderListView, OrderView } from 'app/shared/view-models/interfaces';
import { MatTableModule } from '@angular/material/table';
import { PriceCalculatorService } from 'app/sidenav/services/price-calculator.service';


@Component({
  selector: 'app-order-state-view',
  templateUrl: './order-state-view.component.html',
  styleUrls: ['./order-state-view.component.scss'],
})
export class OrderStateViewComponent implements OnInit, OnDestroy{
  private orderId: string;
  public currentState: number = 0;
  public currentOrder: OrderListView;
  public orderLines: OrderView[];
  private refreshInterval :NodeJS.Timeout;
  constructor(
    private translocoService: TranslocoService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private priceCalculator: PriceCalculatorService,
  ) { }

  columnsOrderLines: any[];
  columnsOL: string[] = [
    'dish.name',
    'orderLine.comment',
    'extras',
    'orderLine.amount',
    'dish.price',
  ];

  address: AddressView[] = [];
  columnsAdresses: any[];
  columnsA: string[] = [
    'postCode',
    'city',
    'street',
    'houseNumber'
  ];

  totalPrice: number;
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => 'number';
  }

  ngOnInit(): void {

    this.translocoService.langChanges$.subscribe((event: any) => {
      this.setTableHeaders(event);
    });

    let translation1: string;
    
    forkJoin([
      this.translocoService.translate('alerts.genericError'),
    ]).subscribe((translation: any) => {
      translation1 = translation[0];
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.orderId = params.get('id');

      this.orderService.getOrder(this.orderId).subscribe((order) => {
        this.currentState = order.order.stateId;
        this.orderLines = order.orderLines;
        this.totalPrice = this.getTotalPrice();

        if(order.address) {
          this.address.push(order.address);
        }
      });


      this.refreshInterval = setInterval(() => this.orderService.getOrder(this.orderId).subscribe((order) => {
        this.currentState = order.order.stateId;
      }),6000);
    });

    this.router.events.subscribe(asd => {
        console.log(asd);
    })
  }

  setTableHeaders(lang: string): void {
    this.translocoService
    .selectTranslateObject('cockpit.orders.dialogTable', {}, lang)
    .subscribe((cockpitDialogTable) => {
      this.columnsOrderLines = [
        { name: 'dish.name', label: cockpitDialogTable.dishH },
        { name: 'orderLine.comment', label: cockpitDialogTable.commentsH },
        { name: 'extras', label: cockpitDialogTable.extrasH },
        { name: 'orderLine.amount', label: cockpitDialogTable.quantityH },
        {
          name: 'dish.price',
          label: cockpitDialogTable.priceH,
          numeric: true,
          format: (v: number) => v.toFixed(2),
        },
      ];
    });

    this.translocoService
      .selectTranslateObject('cockpit.table', {}, lang)
      .subscribe((cockpitTable) => {
        this.columnsAdresses = [
          { name: 'postCode', label: cockpitTable.postCodeH },
          { name: 'city', label: cockpitTable.cityH },
          { name: 'street', label: cockpitTable.streetNameH },
          { name: 'houseNumber', label: cockpitTable.houseNumberH }
        ];
      });
  }

  getTotalPrice(): number {
    return this.priceCalculator.getTotalPrice(this.orderLines);
  }

  ngOnDestroy(): void {
    clearInterval(this.refreshInterval);
  }

}
