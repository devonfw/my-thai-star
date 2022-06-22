import { inject, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, MemoizedSelector } from '@ngrx/store';
import { AuthService } from '../../core/authentication/auth.service';
import { CoreModule } from '../../core/core.module';
import * as fromRoot from '../../store/reducers';
import { UserAreaService } from './user-area.service';
import { getTranslocoModule } from '../../transloco-testing.module';
import { ConfigService } from '../../core/config/config.service';
import { of } from 'rxjs/internal/observable/of';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { config } from '../../core/config/config';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import * as fromAuth from '../../user-area/store';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from '../../core/snack-bar/snack-bar.service';
import { SnackService } from './snack-bar.service';
import { TwoFactorResponse } from '../../shared/view-models/interfaces';

const twoFactorData = {
  modificationCounter: 4,
  id: 1,
  username: 'waiter',
  email: 'waiter@mail.com',
  twoFactorStatus: true,
  userRoleId: 1,
};

const snackBarServiceStub = {
  openSnack: jasmine.createSpy('openSnack'),
};

const snackServiceStub = jasmine.createSpyObj<SnackService>('SnackService', [
  'success',
  'fail',
]);

const configServiceStub = {
  getRestPathRoot: jasmine
    .createSpy('getRestPathRoot')
    .and.returnValue(of('http://localhost:8081/mythaistar/')),
  getRestServiceRoot: jasmine
    .createSpy('getRestServiceRoot')
    .and.returnValue(of('http://localhost:8081/mythaistar/services/rest/')),
};

describe('UserAreaService', () => {
  let httpTestingController: HttpTestingController;
  let userAreaService: UserAreaService;
  let mockStore: MockStore;
  let mockAuthTokenSelector: MemoizedSelector<fromAuth.AppState, string>;
  let mockAuthUsernameSelector: MemoizedSelector<fromAuth.AppState, string>;
  let authService: AuthService;
  let snackBarService: SnackBarService;
  let snackService: SnackService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserAreaService,
        AuthService,
        { provide: SnackService, useValue: snackServiceStub },
        { provode: SnackBarService, useValue: snackBarServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        provideMockStore(),
      ],
      imports: [
        CoreModule,
        HttpClientTestingModule,
        getTranslocoModule(),
        RouterTestingModule,
      ],
    }).compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    userAreaService = TestBed.inject(UserAreaService);
    mockStore = TestBed.inject(MockStore);
    snackBarService = TestBed.inject(SnackBarService);
    snackService = TestBed.inject(SnackService);
    mockAuthTokenSelector = mockStore.overrideSelector(
      fromAuth.getToken,
      'CB_35758b0deeb5ef355c48cTok',
    );
    mockAuthUsernameSelector = mockStore.overrideSelector(
      fromAuth.getUserName,
      'capgemini',
    );
  });

  it('should create', () => {
    expect(userAreaService).toBeTruthy();
  });

  it('should call login service to login the application', () => {
    userAreaService
      .login('waiter', 'waiter')
      .subscribe((response: HttpResponse<any>) => {
        expect(response.status).toBe(200);
        expect(response.body).toBe('Success');
      });
    const req = httpTestingController.expectOne(config.restPathRoot + 'login');
    expect(req.request.method).toEqual('POST');
    req.flush('Success');
  });

  it('should throw error incase login service fails', () => {
    userAreaService.login('waiter', 'waiter').subscribe(
      () => fail('Accepting Invitation operation failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      },
    );
    const req = httpTestingController.expectOne(config.restPathRoot + 'login');
    expect(req.request.method).toEqual('POST');
    req.flush('Login service due to internal error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  it('should open My Thai Star application by successful login credential', waitForAsync(() => {
    userAreaService.register('capgemini', 'capgemini', 'capgemini@capgemini.com')
    .toPromise()
    .then(() => {
      const req = httpTestingController.expectOne(
        config.restServiceRoot + 'usermanagement/v1/user/register',
      );
      expect(req.request.method).toEqual('POST');
      req.flush('success');
      expect(snackService.success).toHaveBeenCalled();
    });
  }));

  it('should throw error in case login credentials not matched', waitForAsync(() => {
    userAreaService.register('capgemini', 'capgemini', 'capgemini@capgemini.com')
    .toPromise()
    .then(() => {
      const req = httpTestingController.expectOne(
        config.restServiceRoot + 'usermanagement/v1/user/register',
      );
      expect(req.request.method).toEqual('POST');
      req.flush('Login credentials not matched', {
        status: 500,
        statusText: 'Internal Server Error',
      });
      expect(snackService.fail).toHaveBeenCalled();
    });
  }));

  it('should update password', () => {
    authService = TestBed.inject(AuthService);
    authService.getUser().subscribe((username) => {
      expect(username).toBe('capgemini');
    });
    userAreaService.changePassword({ username: 'capgemini', password: 'test' });
    const req = httpTestingController.expectOne(
      config.restServiceRoot + 'changepassword',
    );
    expect(req.request.method).toEqual('POST');
    req.flush('success');
    expect(snackService.success).toHaveBeenCalled();
  });

  it('should update password', () => {
    authService = TestBed.inject(AuthService);
    authService.getUser().subscribe((username) => {
      expect(username).toBe('capgemini');
    });
    userAreaService.changePassword({ username: 'capgemini', password: 'test' });
    const req = httpTestingController.expectOne(
      config.restServiceRoot + 'changepassword',
    );
    expect(req.request.method).toEqual('POST');
    req.flush('Password updation failed due to internal error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
    expect(snackService.fail).toHaveBeenCalled();
  });

  it('UserService Pairing', () => {
    userAreaService.pairing().subscribe((twoFactor: TwoFactorResponse) => {
      expect(twoFactor.secret).toBe('6TMNQ2JIJ3FHXULH');
    });
    const req = httpTestingController.expectOne(
      config.restServiceRoot + 'usermanagement/v1/user/pairing/capgemini',
    );
    expect(req.request.method).toEqual('GET');
    req.flush({
      twoFactorStatus: false,
      base64QrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg=',
      secret: '6TMNQ2JIJ3FHXULH',
    });
  });

  it('Should throw error in case UserService Pairing fails ', () => {
    userAreaService.pairing().subscribe(
      () => fail('operation failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      },
    );
    const req = httpTestingController.expectOne(
      config.restServiceRoot + 'usermanagement/v1/user/pairing/capgemini',
    );
    expect(req.request.method).toEqual('GET');
    req.flush('servcie failed due to internal error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  it('UserService Two Factor Status', () => {
    userAreaService
      .twoFactorStatus()
      .subscribe((twoFactor: TwoFactorResponse) => {
        expect(twoFactor.twoFactorStatus).toBeTruthy();
      });
    const req = httpTestingController.expectOne(
      config.restServiceRoot + 'usermanagement/v1/user/twofactor/capgemini',
    );
    expect(req.request.method).toEqual('GET');
    req.flush({
      twoFactorStatus: true,
      base64QrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg=',
      secret: '6TMNQ2JIJ3FHXULH',
    });
  });

  it('Should throw error in case UserService Two Factor Status service fails', () => {
    userAreaService.twoFactorStatus().subscribe(
      () => fail('operation failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      },
    );
    const req = httpTestingController.expectOne(
      config.restServiceRoot + 'usermanagement/v1/user/twofactor/capgemini',
    );
    expect(req.request.method).toEqual('GET');
    req.flush('servcie failed due to internal error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  it('Should update status of TwoFactor', () => {
    userAreaService.changeTwoFactor(true).subscribe((response) => {
      expect(response).toBe(twoFactorData);
    });
    const req = httpTestingController.expectOne(
      config.restServiceRoot + 'usermanagement/v1/user/twofactor/',
    );
    expect(req.request.method).toEqual('POST');
    req.flush(twoFactorData);
  });

  it('Should throw error in case changeTwoFactor service fails', () => {
    userAreaService.changeTwoFactor(true).subscribe(
      () => fail('operation failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      },
    );
    const req = httpTestingController.expectOne(
      config.restServiceRoot + 'usermanagement/v1/user/twofactor/',
    );
    expect(req.request.method).toEqual('POST');
    req.flush('servcie failed due to internal error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
