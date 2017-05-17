import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';
import { SidenavService } from './shared/sidenav.service';
import { PriceCalculatorService } from './shared/price-calculator.service';
import { SidenavOrderComponent } from './sidenav-order/sidenav-order.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CovalentModule } from '../shared/covalent.module';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavComponent, SidenavOrderComponent ],
      providers: [PriceCalculatorService, SidenavService],
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
