import { inject, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, MemoizedSelector } from '@ngrx/store';
import { CoreModule } from '../../core/core.module';
import * as fromRoot from '../../store/reducers';
import { SidenavService } from './sidenav.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as fromOrder from '../store';
import { Order } from '../models/order.model';
import { getAllOrderData } from '../../../in-memory-test-data/db-order-data';
import { of } from 'rxjs/internal/observable/of';
import { ConfigService } from '../../core/config/config.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { config } from '../../core/config/config';
import * as fromAuth from '../../user-area/store';
import { AuthState } from '../../user-area/store/reducers/auth.reducer';
import { HttpErrorResponse } from '@angular/common/http';

const configServiceStub = {
  getRestServiceRoot: jasmine
    .createSpy('getRestServiceRoot')
    .and.returnValue(of('http://localhost:8081/mythaistar/services/rest/')),
};

const sidenavServiceStub = {
  modificationCounter: 0,
  id: 1000001,
  bookingId: 1000000,
  invitedGuestId: null,
  bookingToken: null,
  hostId: null,
};

describe('SidenavSharedService', () => {
  let sidenavService: SidenavService;
  let httpTestingController: HttpTestingController;
  let mockStore: MockStore;
  let mockOrdersSelector: MemoizedSelector<fromOrder.SideNavState, Order[]>;
  let mockAuthTokenSelector: MemoizedSelector<fromAuth.AppState, string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigService, useValue: configServiceStub },
        SidenavService,
        provideMockStore(),
      ],
      imports: [CoreModule, HttpClientTestingModule],
    });
    sidenavService = TestBed.inject(SidenavService);
    httpTestingController = TestBed.inject(HttpTestingController);
    mockStore = TestBed.inject(MockStore);
    mockOrdersSelector = mockStore.overrideSelector(
      fromOrder.getAllOrders,
      getAllOrderData,
    );
    mockAuthTokenSelector = mockStore.overrideSelector(
      fromAuth.getToken,
      'CB_35758b0deeb5ef355c48cTok',
    );
  });

  it('should create', inject([SidenavService], (service: SidenavService) => {
    expect(service).toBeTruthy();
  }));

  it('should call order service to save the order details', () => {
    sidenavService
      .sendOrders('CB_20200527_5f3ac0e8aa148758b0deeb5ef355c48c')
      .subscribe((data) => {
        expect(data).toBeTruthy();
      });
    const req = httpTestingController.expectOne(
      config.restServiceRoot + 'ordermanagement/v1/order',
    );
    expect(req.request.method).toEqual('POST');
    req.flush(sidenavServiceStub);
  });

  it('should throw error incase order service fails', () => {
    sidenavService
      .sendOrders('CB_20200527_5f3ac0e8aa148758b0deeb5ef355c48c')
      .subscribe(
        () => fail('Accepting Invitation operation failed'),
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
        },
    );
    const req = httpTestingController.expectOne(
      config.restServiceRoot + 'ordermanagement/v1/order',
    );
    expect(req.request.method).toEqual('POST');
    req.flush('Order service failed due to internal error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
