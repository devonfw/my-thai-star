import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SidenavOrderComponent } from 'app/sidenav/components/sidenav-order/sidenav-order.component';
import { PriceCalculatorService } from 'app/sidenav/services/price-calculator.service';
import { SidenavService } from 'app/sidenav/services/sidenav.service';
import { CoreModule } from '../../../core/core.module';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import * as fromRoot from '../../../store/reducers';
import { SidenavComponent } from './sidenav.component';

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
        EffectsModule.forRoot([]),
        StoreModule.forRoot(fromRoot.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
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
