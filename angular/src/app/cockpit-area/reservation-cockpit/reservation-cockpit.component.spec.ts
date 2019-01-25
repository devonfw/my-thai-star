import { HttpClient /*, HttpClientModule */ } from '@angular/common/http';
// import { CoreModule } from '../../core/core.module';
// import { MomentModule } from 'angular2-moment';

// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import { ConfigService } from '../../core/config/config.service';
import { WaiterCockpitService } from '../shared/waiter-cockpit.service';
// import { WindowService } from '../../core/window/window.service';
import { MatDialog } from '@angular/material';

import { ReservationCockpitComponent } from './reservation-cockpit.component';
// import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

describe('ReservationCockpitComponent', () => {
  let component: ReservationCockpitComponent;
  // let fixture: ComponentFixture<ReservationCockpitComponent>;
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
  //       ReservationCockpitComponent,
  //     ],
  //     providers: [
  //       WindowService,
  //       WaiterCockpitService,
  //       PriceCalculatorService,
  //       HttpClient,
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
    // fixture = TestBed.createComponent(ReservationCockpitComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    priceCalculator = new PriceCalculatorService();
    configService = new ConfigService(http);
    waiterCockpitService = new WaiterCockpitService(
      http,
      priceCalculator,
      configService,
    );
    component = new ReservationCockpitComponent(
      waiterCockpitService,
      translate,
      dialog,
      configService,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
