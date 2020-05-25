import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PriceCalculatorService } from 'app/sidenav/services/price-calculator.service';
import { SidenavService } from 'app/sidenav/services/sidenav.service';
import { CoreModule } from '../../../core/core.module';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import * as fromOrder from '../../store';
import { SidenavComponent } from './sidenav.component';
import { TranslocoRootModule } from '../../../transloco-root.module';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let store: MockStore<fromOrder.SideNavState>;
  const state = {
    order: {
      selectedOrderId: 1,
    },
    orderSend: {
      token: '',
      orderSent: false,
      error: '',
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SidenavComponent],
      providers: [
        PriceCalculatorService,
        SidenavService,
        SnackBarService,
        provideMockStore({ initialState: state }),
      ],
      imports: [
        BrowserAnimationsModule,
        TranslocoRootModule,
        RouterTestingModule,
        CoreModule,
      ],
    }).compileComponents();

    store = TestBed.get<Store<fromOrder.SideNavState>>(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
