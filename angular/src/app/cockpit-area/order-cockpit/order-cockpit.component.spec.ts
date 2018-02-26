import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'angular2-moment';

import { CoreModule } from '../../core/core.module';

import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import { WaiterCockpitService } from '../shared/waiter-cockpit.service';
import { WindowService } from '../../core/windowService/windowService.service';
import { MatDialog } from '@angular/material';

import { OrderCockpitComponent } from './order-cockpit.component';

describe('OrderCockpitComponent', () => {
  let component: OrderCockpitComponent;
  let fixture: ComponentFixture<OrderCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderCockpitComponent,
      ],
      providers: [
        HttpClient,
        WindowService,
        WaiterCockpitService,
        PriceCalculatorService,
        MatDialog,
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        MomentModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }, 10000);
});
