import { InvitationResponse } from '../../shared/view-models/interfaces';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ConfigService } from '../../core/config/config.service';

/* @export
 * @class EmailConfirmationsService
 */
@Injectable()
export class EmailConfirmationsService {
  private readonly restServiceRoot: string;
  private readonly acceptReserveRestPath: string =
    'bookingmanagement/v1/invitedguest/accept/';
  private readonly rejectReserveRestPath: string =
    'bookingmanagement/v1/invitedguest/decline/';
  private readonly cancelReserveRestPath: string =
    'bookingmanagement/v1/booking/cancel/';
  private readonly cancelOrderRestPath: string =
    'ordermanagement/v1/order/cancelorder/';

  /* Creates an instance of EmailConfirmationsService.
   * @param {HttpClient} http
   * @param {ConfigService} configService
   * @memberof EmailConfirmationsService
   */
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.restServiceRoot = this.configService.getValues().restServiceRoot;
  }

  /* @param {string} token
   * @returns {Observable<InvitationResponse>}
   * @memberof EmailConfirmationsService
   */
  sendAcceptInvitation(token: string): Observable<InvitationResponse> {
    return this.http.get<InvitationResponse>(
      `${this.restServiceRoot}${this.acceptReserveRestPath}` + token,
    );
  }

  /* @param {string} token
   * @returns {Observable<InvitationResponse>}
   * @memberof EmailConfirmationsService
   */
  sendRejectInvitation(token: string): Observable<InvitationResponse> {
    return this.http.get<InvitationResponse>(
      `${this.restServiceRoot}${this.rejectReserveRestPath}` + token,
    );
  }

  /* @param {string} token
   * @returns {Observable<InvitationResponse>}
   * @memberof EmailConfirmationsService
   */
  sendCancelBooking(token: string): Observable<InvitationResponse> {
    return this.http.get<InvitationResponse>(
      `${this.restServiceRoot}${this.cancelReserveRestPath}` + token,
    );
  }

  /* @param {string} token
   * @returns {Observable<boolean>}
   * @memberof EmailConfirmationsService
   */
  sendCancelOrder(token: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.restServiceRoot}${this.cancelOrderRestPath}` + token,
    );
  }
}
