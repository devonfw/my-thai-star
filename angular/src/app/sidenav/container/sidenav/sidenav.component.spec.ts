import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SidenavComponent } from './sidenav.component';
import { SidenavOrderComponent } from 'app/sidenav/components/sidenav-order/sidenav-order.component';
import { PriceCalculatorService } from 'app/sidenav/services/price-calculator.service';
import { SidenavService } from 'app/sidenav/services/sidenav.service';
import { SnackBarService } from 'app/core/snack-bar/snack-bar.service';
import { CoreModule } from 'app/core/core.module';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavComponent, SidenavOrderComponent],
      providers: [PriceCalculatorService, SidenavService, SnackBarService],
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        CoreModule,
      ],
    }).compileComponents();
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
