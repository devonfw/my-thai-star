import { HttpClient /* , HttpClientModule */ } from '@angular/common/http';
// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MomentModule } from 'angular2-moment';

// import { CoreModule } from '../../core/core.module';

import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import { ConfigService } from '../../core/config/config.service';
import { WaiterCockpitService } from '../shared/waiter-cockpit.service';
// import { WindowService } from '../../core/windowService/windowService.service';
import { MatDialog } from '@angular/material';

import { OrderCockpitComponent } from './order-cockpit.component';
// import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

describe('OrderCockpitComponent', () => {
  let component: OrderCockpitComponent;
  // let fixture: ComponentFixture<OrderCockpitComponent>;
  // tslint:disable-next-line:prefer-const
  let http: HttpClient;
  let priceCalculator: PriceCalculatorService;
  let configService: ConfigService;
  let waiterCockpitService: WaiterCockpitService;
  // tslint:disable-next-line:prefer-const
  let translate: TranslateService;
  // tslint:disable-next-line:prefer-const
  let dialog: MatDialog;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [
  //       OrderCockpitComponent,
  //     ],
  //     providers: [
  //       HttpClient,
  //       WindowService,
  //       WaiterCockpitService,
  //       PriceCalculatorService,
  //       MatDialog,
  //     ],
  //     imports: [
  //       BrowserAnimationsModule,
  //       HttpClientModule,
  //       TranslateModule.forRoot(),
  //       CoreModule,
  //       MomentModule,
  //     ],
  //   })
  //     .compileComponents();
  // }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(OrderCockpitComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    priceCalculator = new PriceCalculatorService();
    configService = new ConfigService(http);
    waiterCockpitService = new WaiterCockpitService(
      http,
      priceCalculator,
      configService,
    );
    component = new OrderCockpitComponent(
      dialog,
      translate,
      waiterCockpitService,
      configService,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
