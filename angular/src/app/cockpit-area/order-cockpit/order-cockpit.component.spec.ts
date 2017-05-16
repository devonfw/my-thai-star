import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentCoreModule } from '@covalent/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCockpitComponent } from './order-cockpit.component';
import { OrderCockpitService } from './shared/order-cockpit.service';
import { BackendModule } from '../../shared/backend/backend.module';

describe('OrderCockpitComponent', () => {
  let component: OrderCockpitComponent;
  let fixture: ComponentFixture<OrderCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCockpitComponent ],
      providers: [ OrderCockpitService ],
      imports: [
        CovalentCoreModule.forRoot(),
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
