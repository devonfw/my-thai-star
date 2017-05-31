import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SidenavService } from './shared/sidenav.service';
import { PriceCalculatorService } from './shared/price-calculator.service';
import { SnackBarService } from '../shared/snackService/snackService.service';
import { BookingDataService } from '../shared/backend/booking/booking-data-service';
import { BookingInMemoryService } from '../shared/backend/booking/booking-in-memory.service';
import { OrderInMemoryService } from '../shared/backend/order/order-in-memory.service';
import { OrderDataService } from '../shared/backend/order/order-data-service';
import { SidenavOrderComponent } from './sidenav-order/sidenav-order.component';
import { SidenavComponent } from './sidenav.component';
import { CovalentModule } from '../shared/covalent.module';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavComponent, SidenavOrderComponent ],
      providers: [
        PriceCalculatorService,
        SidenavService,
        SnackBarService,
        {provide: OrderDataService, useClass: OrderInMemoryService},
        {provide: BookingDataService, useClass: BookingInMemoryService}],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        CovalentModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
