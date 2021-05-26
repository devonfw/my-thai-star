import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { forkJoin, interval, Observable } from 'rxjs';
import { OrderService } from './order.service';
import { TranslocoService } from '@ngneat/transloco';
import { ViewChild } from '@angular/core'
import { MatHorizontalStepper } from '@angular/material/stepper'

@Component({
  selector: 'app-order-state-view',
  templateUrl: './order-state-view.component.html',
  styleUrls: ['./order-state-view.component.scss'],
})
export class OrderStateViewComponent implements OnInit, OnDestroy{
  private orderId: string;
  public currentState: number = 0;
  private refreshInterval :NodeJS.Timeout;
  constructor(
    private translocoService: TranslocoService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => 'number';
  }

  ngOnInit(): void {
    let translation1: string;
    
    forkJoin([
      this.translocoService.translate('alerts.genericError'),
    ]).subscribe((translation: any) => {
      translation1 = translation[0];
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.orderId = params.get('id');
      this.refreshInterval = setInterval(() => this.orderService.getOrder(this.orderId).subscribe((order) => {
        this.currentState = order.order.stateId;
      }),6000);
    });

    this.router.events.subscribe(asd => {
        console.log(asd);
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.refreshInterval);
  }

}
