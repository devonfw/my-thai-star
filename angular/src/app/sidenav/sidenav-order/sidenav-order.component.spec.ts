import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavService } from '../shared/sidenav.service';
import { PriceCalculatorService } from '../shared/price-calculator.service';
import { BookingDataService } from '../../shared/backend/booking/booking-data-service';
import { BookingInMemoryService } from '../../shared/backend/booking/booking-in-memory.service';
import { OrderView } from '../../shared/viewModels/interfaces';
import { SidenavOrderComponent } from './sidenav-order.component';
import { CovalentModule } from '../../shared/covalent.module';

describe('SidenavOrderComponent', () => {
  let component: SidenavOrderComponent;
  let fixture: ComponentFixture<SidenavOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavOrderComponent ],
      providers: [SidenavService,
                  PriceCalculatorService,
                  {provide: BookingDataService, useClass: BookingInMemoryService}],
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
            extras: [
                    { name: 'Tofu', price: 1, selected: false },
                    { name: 'Chiken', price: 1, selected: false },
                    { name: 'Pork', price: 2, selected: false }],
            name: 'Red Curry',
            price: 5.90,
            amount: 0,
            comment: 'comment',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
