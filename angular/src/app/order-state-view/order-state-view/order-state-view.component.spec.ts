import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { OrderStateViewComponent } from './order-state-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { getTranslocoModule } from '../../transloco-testing.module';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderService } from './order.service';
import { CoreModule } from '../../core/core.module';
import { ConfigService } from '../../core/config/config.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, observable, throwError } from 'rxjs';
import {MatHorizontalStepper,MatStepperModule} from '@angular/material/stepper'
import { orderData } from 'in-memory-test-data/db-orderbytoken';
import { config } from '../../core/config/config';
import { TranslocoService } from '@ngneat/transloco';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from 'app/store/index';

const mockDialog = {
  open: jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of(true),
  }),
};

const translocoServiceStub = {
  selectTranslateObject: of({
    dishH: 'Dish',
    emailH: 'Email',
    extrasH: 'Extra',
    quantityH: 'Quantity',
    priceH: 'Price',
    postCodeH: 'Post Code',
    cityH: 'City',
    streetNameH: 'Street',
    houseNumberH: 'House Number',
  } as any),
};

const orderServiceStub = {
  getOrders: jasmine.createSpy('getOrder').and.returnValue(of(orderData)),
};

const orderStub = {
  paramMap: of(
    convertToParamMap({
      id: 'OR_dbg10',
    }),
  ),
};

class TestBedSetUp {
  static loadOrderServiceStub(waiterCockpitStub: any): any {
    const initialState = { config };
    return TestBed.configureTestingModule({
      declarations: [OrderStateViewComponent],
      providers: [
        { provide: OrderService, useValue: orderServiceStub },
        { provide: ActivatedRoute, useValue: orderStub},
        TranslocoService,
        ConfigService,
        provideMockStore({ initialState }),
        
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        getTranslocoModule(),
        CoreModule,
        MatStepperModule,
        RouterTestingModule.withRoutes([]),
      ],
    });
  }
}

fdescribe('OrderStateViewComponent', () => {
  let component: OrderStateViewComponent;
  let fixture: ComponentFixture<OrderStateViewComponent>;
  let store: Store<State>;
  let initialState;
  let orderService: OrderService;
  let translocoService: TranslocoService;
  let configService: ConfigService;
  let el: DebugElement;

  beforeEach(async(() => {
    initialState = { config };
    TestBedSetUp.loadOrderServiceStub(orderServiceStub)
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(OrderStateViewComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      store = TestBed.inject(Store);
      configService = new ConfigService(store);
      orderService = TestBed.inject(OrderService);
      translocoService = TestBed.inject(TranslocoService);
    });
  }));

  it('should create component and verify stateId and orderLines', fakeAsync(() => {
    spyOn(translocoService, 'selectTranslateObject').and.returnValue(
      translocoServiceStub.selectTranslateObject,
    );
    fixture.detectChanges();
    tick();
    expect(component).toBeTruthy();
    expect(component.currentState).toEqual(orderData.order.stateId);
    expect(component.orderLines).toEqual(orderData.orderLines);
  }));

})








