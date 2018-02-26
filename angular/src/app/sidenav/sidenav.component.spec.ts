import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SidenavService } from './shared/sidenav.service';
import { PriceCalculatorService } from './shared/price-calculator.service';
import { SnackBarService } from '../core/snackService/snackService.service';

import { SidenavOrderComponent } from './sidenav-order/sidenav-order.component';
import { SidenavComponent } from './sidenav.component';
import { CoreModule } from '../core/core.module';
import { TranslateModule } from '@ngx-translate/core';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavComponent, SidenavOrderComponent ],
      providers: [
        PriceCalculatorService,
        SidenavService,
        SnackBarService,
      ],
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        CoreModule,
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
