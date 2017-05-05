import { SidenavService } from '../shared/sidenav.service';
import { CovalentCoreModule } from '@covalent/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavOrderComponent } from './sidenav-order.component';

describe('SidenavOrderComponent', () => {
  let component: SidenavOrderComponent;
  let fixture: ComponentFixture<SidenavOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavOrderComponent ],
      providers: [SidenavService],
      imports: [
        CovalentCoreModule.forRoot(),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavOrderComponent);
    component = fixture.componentInstance;
    component.order = [];
    component.order.ingredients = ['ingredient'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
