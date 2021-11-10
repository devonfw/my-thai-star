import { TestBed, ComponentFixture, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../../../core/core.module';
import * as fromRoot from '../../store/reducers';
import { UserAreaModule } from '../../user-area.module';
import { QrCodeDialogComponent } from './qr-code-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { UserAreaService } from '../../services/user-area.service';
import { of } from 'rxjs/internal/observable/of';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { click } from '../../../shared/common/test-utils';
import { throwError } from 'rxjs/internal/observable/throwError';
import { SnackService } from '../../services/snack-bar.service';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import { UserDetailsTestData } from '../../../../in-memory-test-data/db-user-details-test-data';

const snackBarServiceStub = {
  openSnack: jasmine.createSpy('openSnack'),
};

const snackServiceStub = jasmine.createSpyObj<SnackService>('SnackService', [
  'success',
  'fail',
]);

const userAreaServiceStub = jasmine.createSpyObj<UserAreaService>(
  'UserAreaService',
  {
    twoFactorStatus: of(UserDetailsTestData.userAreaServiceData),
    changeTwoFactor: of(UserDetailsTestData.twoFactorData),
    pairing: of(UserDetailsTestData.loadQrCodeData),
  },
);

const ERRORMESSAGE = 'An error has ocurred, please try again later';

describe('QrCodeDialogComponent', () => {
  let component: QrCodeDialogComponent;
  let fixture: ComponentFixture<QrCodeDialogComponent>;
  let userAreaService: UserAreaService;
  let el: DebugElement;
  let snackBarService: SnackBarService;
  let snackService: SnackService;

  const compileTestBed = () => {
    userAreaService = TestBed.inject(UserAreaService);
    fixture = TestBed.createComponent(QrCodeDialogComponent);
    snackBarService = TestBed.inject(SnackBarService);
    snackService = TestBed.inject(SnackService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        getTranslocoModule(),
        BrowserAnimationsModule,
        RouterTestingModule,
        UserAreaModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot(fromRoot.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
      providers: [
        { provide: UserAreaService, useValue: userAreaServiceStub },
        { provide: SnackService, useValue: snackServiceStub },
        { provode: SnackBarService, useValue: snackBarServiceStub },
      ],
    }).compileComponents();
  }));

  describe('Positive Snerario - QrCodeDialogComponent', () => {
    beforeEach(() => {
      compileTestBed();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.twoFactorStatus).toBeFalsy();
    });

    it('should set up two factor authentication ', () => {
      const slider = el.query(By.directive(MatSlideToggle));
      slider.triggerEventHandler('change', null);
      expect(component.secret).toBe(UserDetailsTestData.loadQrCodeData.secret);
      expect(component.qrcode).toBe(
        UserDetailsTestData.loadQrCodeData.base64QrCode,
      );
    });
  });

  describe('Negative Snerario - QrCodeDialogComponent', () => {
    const userAreaServiceTwoFactorErrorStub = jasmine.createSpyObj<
      UserAreaService
      >('UserAreaService', {
        twoFactorStatus: throwError(ERRORMESSAGE),
        changeTwoFactor: of(UserDetailsTestData.twoFactorData),
        pairing: of(UserDetailsTestData.loadQrCodeData),
      });

    const userAreaServicePairingErrorStub = jasmine.createSpyObj<
      UserAreaService
      >('UserAreaService', {
        twoFactorStatus: of(UserDetailsTestData.userAreaServiceData),
        changeTwoFactor: of(UserDetailsTestData.twoFactorData),
        pairing: throwError(ERRORMESSAGE),
      });

    it('should verify changeTwoFactor service fails for set up two factor authentication due to error ', () => {
      TestBed.overrideProvider(UserAreaService, {
        useValue: userAreaServiceTwoFactorErrorStub,
      });
      compileTestBed();
      const slider = el.query(By.directive(MatSlideToggle));
      slider.triggerEventHandler('change', null);
      expect(snackService.fail).toHaveBeenCalled();
    });

    it('should verify pairing service fails for set up two factor authentication due to error ', () => {
      TestBed.overrideProvider(UserAreaService, {
        useValue: userAreaServicePairingErrorStub,
      });
      compileTestBed();
      const slider = el.query(By.directive(MatSlideToggle));
      slider.triggerEventHandler('change', null);
      expect(snackService.fail).toHaveBeenCalled();
    });
  });
});
