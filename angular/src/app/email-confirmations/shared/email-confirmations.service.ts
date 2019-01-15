import { InvitationResponse } from '../../shared/viewModels/interfaces';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ConfigService } from '../../core/config/config.service';

@Injectable()
export class EmailConfirmationsService {

  private readonly restServiceRoot: string;
  private readonly acceptReserveRestPath: string = 'bookingmanagement/v1/invitedguest/accept/';
  private readonly rejectReserveRestPath: string = 'bookingmanagement/v1/invitedguest/decline/';
  private readonly cancelReserveRestPath: string = 'bookingmanagement/v1/booking/cancel/';
  private readonly cancelOrderRestPath: string = 'ordermanagement/v1/order/cancelorder/';

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.restServiceRoot = this.configService.getValues().restServiceRoot;
   }

  sendAcceptInvitation(token: string): Observable<InvitationResponse> {
    return this.http.get<InvitationResponse>(`${this.restServiceRoot}${this.acceptReserveRestPath}` + token);
  }

  sendRejectInvitation(token: string): Observable<InvitationResponse> {
    return this.http.get<InvitationResponse>(`${this.restServiceRoot}${this.rejectReserveRestPath}` + token);
  }

  sendCancelBooking(token: string): Observable<InvitationResponse> {
    return this.http.get<InvitationResponse>(`${this.restServiceRoot}${this.cancelReserveRestPath}` + token);
  }

  sendCancelOrder(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.restServiceRoot}${this.cancelOrderRestPath}` + token);
  }
}
