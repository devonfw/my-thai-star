import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../../core/core.module';

import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import { WaiterCockpitService } from '../shared/waiter-cockpit.service';
import { WindowService } from '../../core/windowService/windowService.service';

import { OrderCockpitComponent } from './order-cockpit.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';

describe('OrderCockpitComponent', () => {
  let component: OrderCockpitComponent;
  let fixture: ComponentFixture<OrderCockpitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderCockpitComponent,
        OrderDialogComponent,
      ],
      providers: [
        WindowService,
        WaiterCockpitService,
        PriceCalculatorService,
        HttpClient,
      ],
      imports: [
        CoreModule,
        BrowserAnimationsModule,
        HttpClientModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
