import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentCoreModule } from '@covalent/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCockpitComponent } from './order-cockpit.component';

describe('OrderCockpitComponent', () => {
  let component: OrderCockpitComponent;
  let fixture: ComponentFixture<OrderCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCockpitComponent ],
      imports: [
        CovalentCoreModule.forRoot(),
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
