import { SidenavService } from '../shared/sidenav.service';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PriceCalculatorService } from '../shared/price-calculator.service';
import { OrderView } from '../../shared/models/interfaces';
import { SidenavOrderComponent } from './sidenav-order.component';
import { CovalentModule } from '../../shared/covalent.module';

describe('SidenavOrderComponent', () => {
  let component: SidenavOrderComponent;
  let fixture: ComponentFixture<SidenavOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavOrderComponent ],
      providers: [SidenavService, PriceCalculatorService],
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
            options: [
                    { name: 'Tofu', price: 1, selected: false },
                    { name: 'Chiken', price: 1, selected: false },
                    { name: 'Pork', price: 2, selected: false }],
            orderName: 'Red Curry',
            price: 5.90,
            number: 0,
            comment: 'comment',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
