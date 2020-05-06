import { HttpClient /*, HttpClientModule */ } from '@angular/common/http';
// import { CoreModule } from '../../core/core.module';
// import { MomentModule } from 'angular2-moment';

// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PriceCalculatorService } from '../../sidenav/services/price-calculator.service';
import { ConfigService } from '../../core/config/config.service';
import { WaiterCockpitService } from '../services/waiter-cockpit.service';
// import { WindowService } from '../../core/window/window.service';
import { MatDialog } from '@angular/material/dialog';

import { ReservationCockpitComponent } from './reservation-cockpit.component';
// import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { State } from 'app/store';
import { Store } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { config } from '../../core/config/config';

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
  // tslint:disable-next-line: prefer-const
  let store: Store<State>;

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
    const initialState = { config };
    // fixture = TestBed.createComponent(ReservationCockpitComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      imports: [],
    });
    store = TestBed.get(Store);
    priceCalculator = new PriceCalculatorService();
    configService = new ConfigService(store);
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
