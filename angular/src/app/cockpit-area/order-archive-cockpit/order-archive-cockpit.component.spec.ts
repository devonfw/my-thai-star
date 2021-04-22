import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderArchiveCockpitComponent } from './order-archive-cockpit.component';

describe('OrderArchiveCockpitComponent', () => {
  let component: OrderArchiveCockpitComponent;
  let fixture: ComponentFixture<OrderArchiveCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderArchiveCockpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderArchiveCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
