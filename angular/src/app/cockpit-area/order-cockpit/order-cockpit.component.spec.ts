import { HttpClient /* , HttpClientModule */ } from '@angular/common/http';
// import { WindowService } from '../../core/window/window.service';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
// import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { State } from 'app/store';
import { ConfigService } from '../../core/config/config.service';
// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MomentModule } from 'angular2-moment';
// import { CoreModule } from '../../core/core.module';
import { PriceCalculatorService } from '../../sidenav/services/price-calculator.service';
import { WaiterCockpitService } from '../services/waiter-cockpit.service';
import { OrderCockpitComponent } from './order-cockpit.component';
import { config } from '../../core/config/config';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

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
  // tslint:disable-next-line:prefer-const
  let store: Store<State>;
  let initialState;

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
    initialState = { config };
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.get(Store);
    priceCalculator = new PriceCalculatorService();
    configService = new ConfigService(store);
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
