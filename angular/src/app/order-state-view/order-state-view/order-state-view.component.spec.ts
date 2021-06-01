import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { OrderService } from "./order.service";
import { orderData } from '../../../in-memory-test-data/db-order';
import { OrderStateViewComponent } from './order-state-view.component';
import { TranslocoService } from "@ngneat/transloco";
import { MatHorizontalStepper } from "@angular/material/stepper";
import { getTranslocoModule } from "app/transloco-testing.module";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "app/core/core.module";

//const fakeOrderService = {
//  getOrders: orderData,
//};


const fakeOrderService = {
  getOrders: jasmine.createSpy('getOrders').and.returnValue(of(orderData)),
};

const orderStub = {
  paramMap: of(
    convertToParamMap({
      id: 'OR_dbg10',
    }),
  ),
};

class TestBedSetUp {
  static loadBeforeTesting(){
    return TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OrderStateViewComponent],
      providers: [
        { provide: OrderService, useValue: fakeOrderService.getOrders },
        { provide: MatHorizontalStepper, useValue: {} },
        { provide: ActivatedRoute, useValue: orderStub },
        TranslocoService
      ],
      imports: [
        getTranslocoModule(),
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        CoreModule,
      ],
    });
  }
}

describe('OrderStateViewComponent', () => {

  let component: OrderStateViewComponent;
  let fixture: ComponentFixture<OrderStateViewComponent>;
  let translocoService: TranslocoService;
  let stepper: MatHorizontalStepper;


  beforeEach(async() => {


    await TestBedSetUp.loadBeforeTesting().compileComponents().then(() => {

      fixture = TestBed.createComponent(OrderStateViewComponent);
      component = fixture.componentInstance;
      translocoService = TestBed.inject(TranslocoService);
      stepper = TestBed.inject(MatHorizontalStepper);
      component.stepper = stepper;
      fixture.detectChanges();
    });
  });

  it("should create",() => {
    expect(component).toBeTruthy()
  });

});