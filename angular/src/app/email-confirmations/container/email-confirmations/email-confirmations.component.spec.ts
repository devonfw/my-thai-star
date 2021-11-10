import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, fakeAsync, tick, inject, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailConfirmationsComponent } from './email-confirmations.component';
import { EmailConfirmationsService } from '../../services/email-confirmations.service';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import { CoreModule } from '../../../core/core.module';
import { config } from '../../../core/config/config';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfigService } from '../../../core/config/config.service';
import { getTranslocoModule } from '../../../transloco-testing.module';
import {
  ActivatedRoute,
  ParamMap,
  convertToParamMap,
  Router,
} from '@angular/router';
import { of, observable, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { emailConfirmationsStub } from '../../../../in-memory-test-data/db-email-confirmation-data';
import { TranslocoService } from '@ngneat/transloco';

const ERRORMESSAGE = 'An error has ocurred, please try again later';

class ActivatedMockStubs {
  static acceptInvitationStub = {
    paramMap: of(
      convertToParamMap({
        token: '1234',
        action: 'acceptInvite',
      }),
    ),
  };

  static rejectInvitationStub = {
    paramMap: of(
      convertToParamMap({
        token: '1234',
        action: 'rejectInvite',
      }),
    ),
  };

  static cancelBookingStub = {
    paramMap: of(
      convertToParamMap({
        token: '1234',
        action: 'cancel',
      }),
    ),
  };

  static cancelOrderStub = {
    paramMap: of(
      convertToParamMap({
        token: '1234',
        action: 'cancelOrder',
      }),
    ),
  };
}

const snackBarServiceStub = {
  openSnack: jasmine.createSpy('openSnack'),
};

const translocoServiceStub = {
  translate: jasmine.createSpy('translate').and.returnValue({
    accessError: 'Access denied, please log in first',
    genericError: 'An error has ocurred, please try again later',
    urlError: 'Url not found, please try again',
  }),
};

const emailConfirmationsServiceSuccessStub = jasmine.createSpyObj<
  EmailConfirmationsService
  >('EmailConfirmationsService', {
    sendAcceptInvitation: of(emailConfirmationsStub.acceptInvitation),
    sendRejectInvitation: of(emailConfirmationsStub.rejectInvitation),
    sendCancelBooking: of(emailConfirmationsStub.booking),
    sendCancelOrder: of(true),
  });

const emailConfirmationsServiceErrorStub = jasmine.createSpyObj<
  EmailConfirmationsService
  >('EmailConfirmationsService', {
    sendAcceptInvitation: throwError(ERRORMESSAGE),
    sendRejectInvitation: throwError(ERRORMESSAGE),
    sendCancelBooking: throwError(ERRORMESSAGE),
    sendCancelOrder: throwError(ERRORMESSAGE),
  });

describe('EmailConfirmationsComponent', () => {
  let component: EmailConfirmationsComponent;
  let fixture: ComponentFixture<EmailConfirmationsComponent>;
  let initialState;
  let snackBarService: SnackBarService;

  const compileTestBed = () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(EmailConfirmationsComponent);
    component = fixture.componentInstance;
    snackBarService = TestBed.inject(SnackBarService);
    fixture.detectChanges();
  };

  function testBedOverrideProvider(service: any, provider: any): void {
    TestBed.overrideProvider(service, { useValue: provider });
  }

  beforeEach(waitForAsync(() => {
    initialState = { config };
    TestBed.configureTestingModule({
      declarations: [EmailConfirmationsComponent],
      providers: [
        { provide: SnackBarService, useValue: snackBarServiceStub },
        {
          provide: EmailConfirmationsService,
          useValue: emailConfirmationsServiceSuccessStub,
        },
        provideMockStore({ initialState }),
        ConfigService,
        {
          provide: ActivatedRoute,
          useValue: ActivatedMockStubs.acceptInvitationStub,
        },
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        getTranslocoModule(),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        CoreModule,
      ],
    });
  }));

  it('should be created and verify email confirmation service call for Accept invitation ', () => {
    compileTestBed();
    expect(component).toBeTruthy();
    expect(snackBarService.openSnack).toHaveBeenCalled();
  });

  it('verify email confirmation service call for Reject invitation', () => {
    testBedOverrideProvider(
      ActivatedRoute,
      ActivatedMockStubs.rejectInvitationStub,
    );
    compileTestBed();
    expect(component).toBeTruthy();
    expect(snackBarService.openSnack).toHaveBeenCalled();
  });

  it('verify email confirmation service call for Cancel Booking', () => {
    testBedOverrideProvider(
      ActivatedRoute,
      ActivatedMockStubs.cancelBookingStub,
    );
    compileTestBed();
    expect(component).toBeTruthy();
    expect(snackBarService.openSnack).toHaveBeenCalled();
  });

  it('verify email confirmation service call for Cancel Order', () => {
    testBedOverrideProvider(ActivatedRoute, ActivatedMockStubs.cancelOrderStub);
    compileTestBed();
    expect(component).toBeTruthy();
    expect(snackBarService.openSnack).toHaveBeenCalled();
  });

  describe('Email Confirmations for the failed senario', () => {
    beforeEach(() => {
      testBedOverrideProvider(
        EmailConfirmationsService,
        emailConfirmationsServiceErrorStub,
      );
    });

    it('Verify email confirmation incase Accept invitation service failed ', () => {
      compileTestBed();
      expect(component).toBeTruthy();
      expect(snackBarService.openSnack).toHaveBeenCalled();
    });

    it('Verify email confirmation incase Reject invitation service failed ', () => {
      testBedOverrideProvider(
        ActivatedRoute,
        ActivatedMockStubs.rejectInvitationStub,
      );
      compileTestBed();
      expect(component).toBeTruthy();
      expect(snackBarService.openSnack).toHaveBeenCalled();
    });

    it('Verify email confirmation incase Cancel Booking service failed ', () => {
      testBedOverrideProvider(
        ActivatedRoute,
        ActivatedMockStubs.cancelBookingStub,
      );
      compileTestBed();
      expect(component).toBeTruthy();
      expect(snackBarService.openSnack).toHaveBeenCalled();
    });

    it('Verify email confirmation incase Cancel Order service failed ', () => {
      testBedOverrideProvider(
        ActivatedRoute,
        ActivatedMockStubs.cancelOrderStub,
      );
      compileTestBed();
      expect(component).toBeTruthy();
      expect(snackBarService.openSnack).toHaveBeenCalled();
    });
  });
});
