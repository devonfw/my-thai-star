import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderStateViewComponent } from './order-state-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { getTranslocoModule } from '../../transloco-testing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderService } from './order.service';
import { CoreModule } from '../../core/core.module';
import { ConfigService } from '../../core/config/config.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, observable, throwError } from 'rxjs';
import {MatHorizontalStepper,MatStepperModule} from '@angular/material/stepper'

const orderStub = {
  paramMap: of(
    convertToParamMap({
      id: 'OR_dbg10',
    }),
  ),
};

describe('OrderStateViewComponent', () => {
  let component: OrderStateViewComponent;
  let fixture: ComponentFixture<OrderStateViewComponent>;
  let stepper: MatHorizontalStepper;

  const state = {
    error: null,
    text: null,
    user: {},
    token: {
      token: '',
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OrderStateViewComponent],
      providers: [
        OrderService,
        ConfigService,
        {
          provide: MatHorizontalStepper,
          useValue: {},
        },
        provideMockStore({ initialState: state }),
        {
          provide: ActivatedRoute,
          useValue: orderStub,
        },
      ],
      imports: [
        CoreModule,
        MatStepperModule,
        getTranslocoModule(),
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStateViewComponent);
    component = fixture.componentInstance;
    
    stepper = TestBed.inject(MatHorizontalStepper);
    component.stepper = stepper;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
