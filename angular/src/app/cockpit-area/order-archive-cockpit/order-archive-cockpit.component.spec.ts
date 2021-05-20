import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderArchiveCockpitComponent } from './order-archive-cockpit.component';
import { of } from 'rxjs/internal/observable/of';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { config } from '../../core/config/config';
import { WaiterCockpitService } from '../services/waiter-cockpit.service';
import { ConfigService } from '../../core/config/config.service';
import { provideMockStore } from '@ngrx/store/testing';
import { getTranslocoModule } from '../../transloco-testing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../../core/core.module';
import { Store } from '@ngrx/store';
import { State } from '../../store';
import { DebugElement } from '@angular/core';
import { ascSortOrder } from '../../../in-memory-test-data/db-order-asc-sort';
import { orderData } from '../../../in-memory-test-data/db-order';


const translocoServiceStub = {
  selectTranslateObject: of({
    orderedH: 'Ordered',
    preparationH: 'Preparation',
    deliveryH: 'Delivery',
    deliveredH: 'Delivered',
    canceledH: 'Canceled',
  } as any),
};

const mockDialog = {
  open: jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of(true),
  }),
};

const waiterCockpitServiceStub = {
  getOrders: jasmine.createSpy('getOrders').and.returnValue(of(orderData)),
};

const waiterCockpitServiceSortStub = {
  getOrders: jasmine.createSpy('getOrders').and.returnValue(of(ascSortOrder)),
};

class TestBedSetUp {
  static loadWaiterCockpitServiceStud(waiterCockpitStub: any): any {
    const initialState = { config };
    return TestBed.configureTestingModule({
      declarations: [OrderArchiveCockpitComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: WaiterCockpitService, useValue: waiterCockpitStub },
        TranslocoService,
        ConfigService,
        provideMockStore({ initialState }),
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        getTranslocoModule(),
        CoreModule,
      ],
    });
  }
}



describe('OrderArchiveCockpitComponent', () => {
  let component: OrderArchiveCockpitComponent;
  let fixture: ComponentFixture<OrderArchiveCockpitComponent>;
  
  let store: Store<State>;
  let initialState;
  let waiterCockpitService: WaiterCockpitService;
  let dialog: MatDialog;
  let translocoService: TranslocoService;
  let configService: ConfigService;
  let el: DebugElement;



  beforeEach(async(() => {
    initialState = { config };
    TestBedSetUp.loadWaiterCockpitServiceStud(waiterCockpitServiceStub)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(OrderArchiveCockpitComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        store = TestBed.inject(Store);
        configService = new ConfigService(store);
        waiterCockpitService = TestBed.inject(WaiterCockpitService);
        dialog = TestBed.inject(MatDialog);
        translocoService = TestBed.inject(TranslocoService);
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
