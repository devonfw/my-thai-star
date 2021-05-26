import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStateViewComponent } from './order-state-view.component';

describe('OrderStateViewComponent', () => {
  let component: OrderStateViewComponent;
  let fixture: ComponentFixture<OrderStateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStateViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
