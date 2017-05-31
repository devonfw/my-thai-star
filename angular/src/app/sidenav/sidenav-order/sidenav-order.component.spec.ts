import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavService } from '../shared/sidenav.service';
import { PriceCalculatorService } from '../shared/price-calculator.service';
import { BookingDataService } from '../../shared/backend/booking/booking-data-service';
import { BookingInMemoryService } from '../../shared/backend/booking/booking-in-memory.service';
import { OrderInMemoryService } from '../../shared/backend/order/order-in-memory.service';
import { OrderDataService } from '../../shared/backend/order/order-data-service';
import { SnackBarService } from '../../shared/snackService/snackService.service';
import { OrderView } from '../../shared/viewModels/interfaces';
import { SidenavOrderComponent } from './sidenav-order.component';
import { CovalentModule } from '../../shared/covalent.module';

describe('SidenavOrderComponent', () => {
  let component: SidenavOrderComponent;
  let fixture: ComponentFixture<SidenavOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavOrderComponent ],
      providers: [
        SidenavService,
        PriceCalculatorService,
        SnackBarService,
        {provide: BookingDataService, useClass: BookingInMemoryService},
        {provide: OrderDataService, useClass: OrderInMemoryService}],
      imports: [
        CovalentModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavOrderComponent);
    component = fixture.componentInstance;
    component.order = {
      dish: {
        dishId: 0,
        name: 'Red Curry',
        price: 5.90,
      },
      orderLine: {
        amount: 0,
        comment: 'comment',
      },
      extras: [
        { id: 0, name: 'Tofu', price: 1, selected: false },
        { id: 1, name: 'Chiken', price: 1, selected: false },
        { id: 2, name: 'Pork', price: 2, selected: false }],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
