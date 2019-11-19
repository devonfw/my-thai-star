import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { ConfigService } from '../../core/config/config.service';
import { InvitationResponse } from '../../shared/view-models/interfaces';

@Injectable()
export class EmailConfirmationsService {
  private readonly restServiceRoot$: Observable<
    string
  > = this.config.getRestServiceRoot();
  private readonly acceptReserveRestPath: string =
    'bookingmanagement/v1/invitedguest/accept/';
  private readonly rejectReserveRestPath: string =
    'bookingmanagement/v1/invitedguest/decline/';
  private readonly cancelReserveRestPath: string =
    'bookingmanagement/v1/booking/cancel/';
  private readonly cancelOrderRestPath: string =
    'ordermanagement/v1/order/cancelorder/';

  constructor(private http: HttpClient, private config: ConfigService) {}

  sendAcceptInvitation(token: string): Observable<InvitationResponse> {
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.get<InvitationResponse>(
          `${restServiceRoot}${this.acceptReserveRestPath}` + token,
        ),
      ),
    );
  }

  sendRejectInvitation(token: string): Observable<InvitationResponse> {
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.get<InvitationResponse>(
          `${restServiceRoot}${this.rejectReserveRestPath}` + token,
        ),
      ),
    );
  }

  sendCancelBooking(token: string): Observable<InvitationResponse> {
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.get<InvitationResponse>(
          `${restServiceRoot}${this.cancelReserveRestPath}` + token,
        ),
      ),
    );
  }

  sendCancelOrder(token: string): Observable<boolean> {
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.get<boolean>(
          `${restServiceRoot}${this.cancelOrderRestPath}` + token,
        ),
      ),
    );
  }
}
