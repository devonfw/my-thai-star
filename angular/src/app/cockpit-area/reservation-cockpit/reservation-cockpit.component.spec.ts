import { HttpClient /*, HttpClientModule */ } from '@angular/common/http';
// import { CoreModule } from '../../core/core.module';
// import { MomentModule } from 'angular2-moment';

// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import { WaiterCockpitService } from '../shared/waiter-cockpit.service';
// import { WindowService } from '../../core/windowService/windowService.service';
import { MatDialog } from '@angular/material';

import { ReservationCockpitComponent } from './reservation-cockpit.component';
// import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

describe('ReservationCockpitComponent', () => {
  let component: ReservationCockpitComponent;
  // let fixture: ComponentFixture<ReservationCockpitComponent>;
  let http: HttpClient;
  let priceCalculator: PriceCalculatorService;
  let waiterCockpitService: WaiterCockpitService;
  let translate: TranslateService;
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
    waiterCockpitService = new WaiterCockpitService(http, priceCalculator);
    component = new ReservationCockpitComponent(
      waiterCockpitService,
      translate,
      dialog,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
