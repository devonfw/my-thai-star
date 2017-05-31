import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentModule } from '../../shared/covalent.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCockpitComponent } from './order-cockpit.component';
import { OrderCockpitService } from './shared/order-cockpit.service';
import { BackendModule } from '../../shared/backend/backend.module';
import { Pagination } from '../../shared/backend/backendModels/interfaces';
import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';

describe('OrderCockpitComponent', () => {
  let component: OrderCockpitComponent;
  let fixture: ComponentFixture<OrderCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCockpitComponent ],
      providers: [ OrderCockpitService, PriceCalculatorService ],
      imports: [
        CovalentModule,
        BackendModule.forRoot({environmentType: 0, restServiceRoot: 'v1'}),
        BrowserAnimationsModule,
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
  });
});
