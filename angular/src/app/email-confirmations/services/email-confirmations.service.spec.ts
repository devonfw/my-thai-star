import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { EmailConfirmationsService } from './email-confirmations.service';
import { config } from '../../core/config/config';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfigService } from '../../core/config/config.service';
import { of } from 'rxjs/internal/observable/of';
import { emailConfirmationsStub } from '../../../in-memory-test-data/db-email-confirmation-data';
import { HttpErrorResponse } from '@angular/common/http';

const configServiceStub = {
  getRestServiceRoot: jasmine
    .createSpy('getRestServiceRoot')
    .and.returnValue(of('http://localhost:8081/mythaistar/services/rest/')),
};

describe('EmailConfirmationsService', () => {
  let emailConfirmationsService: EmailConfirmationsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ConfigService, useValue: configServiceStub },
        EmailConfirmationsService,
      ],
    });
    emailConfirmationsService = TestBed.inject(EmailConfirmationsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', inject(
    [EmailConfirmationsService],
    (service: EmailConfirmationsService) => {
      expect(service).toBeTruthy();
    },
  ));

  it('should verify AcceptInvitation through email service', () => {
    emailConfirmationsService
      .sendAcceptInvitation('testingToken')
      .subscribe((invitation) => {
        expect(invitation).toBeTruthy();
        expect(invitation).toEqual(emailConfirmationsStub.acceptInvitation);
        expect(invitation.accepted).toBeTruthy();
      });
    const req = httpTestingController.expectOne(
      config.restServiceRoot +
      'bookingmanagement/v1/invitedguest/accept/testingToken',
    );
    expect(req.request.method).toEqual('GET');
    req.flush(emailConfirmationsStub.acceptInvitation);
  });

  it('should verify RejectInvitation through email service', () => {
    emailConfirmationsService
      .sendRejectInvitation('testingToken')
      .subscribe((invitation) => {
        expect(invitation).toBeTruthy();
        expect(invitation).toEqual(emailConfirmationsStub.rejectInvitation);
        expect(invitation.accepted).toBeFalsy();
      });
    const req = httpTestingController.expectOne(
      config.restServiceRoot +
      'bookingmanagement/v1/invitedguest/decline/testingToken',
    );
    expect(req.request.method).toEqual('GET');
    req.flush(emailConfirmationsStub.rejectInvitation);
  });

  it('should verify CancelBooking through email service', () => {
    emailConfirmationsService
      .sendCancelBooking('testingToken')
      .subscribe((booking) => {
        expect(booking).toBeTruthy();
        expect(booking).toEqual(emailConfirmationsStub.booking);
        expect(booking.accepted).toBeTruthy();
      });
    const req = httpTestingController.expectOne(
      config.restServiceRoot +
      'bookingmanagement/v1/booking/cancel/testingToken',
    );
    expect(req.request.method).toEqual('GET');
    req.flush(emailConfirmationsStub.booking);
  });

  it('should verify CancelOrder through email service', () => {
    emailConfirmationsService
      .sendCancelOrder('testingToken')
      .subscribe((orderCancellation) => {
        expect(orderCancellation).toBeTruthy();
      });
    const req = httpTestingController.expectOne(
      config.restServiceRoot +
      'ordermanagement/v1/order/cancelorder/testingToken',
    );
    expect(req.request.method).toEqual('GET');
    req.flush(of(true));
  });

  // -------- Negative Scenatio --------//

  it('should verify AcceptInvitation incase email service failed', () => {
    emailConfirmationsService.sendAcceptInvitation('testingToken').subscribe(
      () => fail('Accepting Invitation operation failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      },
    );
    const req = httpTestingController.expectOne(
      config.restServiceRoot +
      'bookingmanagement/v1/invitedguest/accept/testingToken',
    );
    expect(req.request.method).toEqual('GET');
    req.flush('Invitation not accepted due to internal error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  it('should verify RejectInvitation incase email service failed', () => {
    emailConfirmationsService.sendRejectInvitation('testingToken').subscribe(
      () => fail('Invitation rejection operation failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      },
    );
    const req = httpTestingController.expectOne(
      config.restServiceRoot +
      'bookingmanagement/v1/invitedguest/decline/testingToken',
    );
    expect(req.request.method).toEqual('GET');
    req.flush('Invitation rejected due to internal server error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  it('should verify CancelBooking incase email service failed', () => {
    emailConfirmationsService.sendCancelBooking('testingToken').subscribe(
      () => fail('Booking cancellation operation failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      },
    );
    const req = httpTestingController.expectOne(
      config.restServiceRoot +
      'bookingmanagement/v1/booking/cancel/testingToken',
    );
    expect(req.request.method).toEqual('GET');
    req.flush('Booking cancelled', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  it('should verify CancelOrder incase email service failed', () => {
    emailConfirmationsService.sendCancelOrder('testingToken').subscribe(
      () => fail('Order cancellation operation failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      },
    );
    const req = httpTestingController.expectOne(
      config.restServiceRoot +
      'ordermanagement/v1/order/cancelorder/testingToken',
    );
    expect(req.request.method).toEqual('GET');
    req.flush('Order cancelled', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
