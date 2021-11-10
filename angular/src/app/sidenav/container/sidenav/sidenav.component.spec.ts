import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SidenavService } from '../../services/sidenav.service';
import { PriceCalculatorService } from '../../services/price-calculator.service';
import { CoreModule } from '../../../core/core.module';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import * as fromOrder from '../../store';
import { SidenavComponent } from './sidenav.component';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { getAllOrderData } from '../../../../in-memory-test-data/db-order-data';
import * as fromSideNavState from '../../../sidenav/store/reducers';
import { SidenavOrderComponent } from '../../components/sidenav-order/sidenav-order.component';
import { By } from '@angular/platform-browser';
import { click } from '../../../shared/common/test-utils';
import { MemoizedSelector } from '@ngrx/store';
import { Order } from '../../models/order.model';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs/internal/observable/of';

const mockDialog = {
  open: jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of('content'),
  }),
};

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let mockStore: MockStore;
  let el: DebugElement;
  let mockOrdersSelector: MemoizedSelector<fromOrder.SideNavState, Order[]>;
  let dialog: MatDialog;
  let sidenavService: SidenavService;

  const STATE = {
    sidenav: {
      order: getAllOrderData,
      selectedOrderId: null,
    },
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SidenavComponent, SidenavOrderComponent],
      providers: [
        PriceCalculatorService,
        {
          provide: SidenavService,
          useValue: { closeSideNav: jasmine.createSpy('closeSideNav') },
        },
        SnackBarService,
        provideMockStore(),
        { provide: MatDialog, useValue: mockDialog },
      ],
      imports: [
        BrowserAnimationsModule,
        getTranslocoModule(),
        RouterTestingModule,
        CoreModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockOrdersSelector = mockStore.overrideSelector(
      fromOrder.getAllOrders,
      getAllOrderData,
    );
    sidenavService = TestBed.inject(SidenavService);
    el = fixture.debugElement;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update or increased the order by clicking + operator', () => {
    spyOn(mockStore, 'dispatch').and.callThrough();
    const btn = el.queryAll(By.css('.increaseOrder'));
    click(btn[0]);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should update or decrease the order by clicking - operator', () => {
    spyOn(mockStore, 'dispatch').and.callThrough();
    const btn = el.queryAll(By.css('.decreaseOrder'));
    click(btn[0]);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should remove the order by clicking the close icon [X]', () => {
    spyOn(mockStore, 'dispatch').and.callThrough();
    const btn = el.queryAll(By.css('.removeOrderBtn'));
    click(btn[0]);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should remove the comment on click of Remove Comment text', () => {
    spyOn(mockStore, 'dispatch').and.callThrough();
    const btn = el.queryAll(By.css('.removeOrderComment'));
    click(btn[0]);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should add the comment on click of Add Comment text', fakeAsync(() => {
    spyOn(mockStore, 'dispatch').and.callThrough();
    const btn = el.queryAll(By.css('.addOrderComment'));
    click(btn[0]);
    fixture.detectChanges();
    tick();
    expect(dialog.open).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalled();
  }));

  it('should send the order details to the end user on click of send button', () => {
    spyOn(mockStore, 'dispatch').and.callThrough();
    const btn = el.query(By.css('.orderSubmit'));
    click(btn);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should close sidenav pop up on click of order cancel button', () => {
    spyOn(mockStore, 'dispatch').and.callThrough();
    const btn = el.query(By.css('.orderCancel'));
    click(btn);
    expect(sidenavService.closeSideNav).toHaveBeenCalled();
  });
});
