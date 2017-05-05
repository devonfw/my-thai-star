import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BusinessOperations } from '../../shared/BusinessOperations';
import { ReservationView, InvitationView } from '../../shared/models/interfaces';

@Injectable()
export class BookTableService {

  BO: BusinessOperations = new BusinessOperations();

  constructor(private http: Http) {
  }

  getTableId(): Observable<any> {
    return this.http.get(this.BO.getbookingid)
                    .map((res: any) => res.json());
  }

  postBookingTable(bookInfo: ReservationView): Observable<any> {
    return this.http.post(this.BO.postbookingtable, bookInfo)
                    .map((res: any) => res.json());
  }

  postInvitationTable(invitationInfo: InvitationView): Observable<any> {
    return this.http.post(this.BO.postbookinginvitation, invitationInfo)
                    .map((res: any) => res.json());
  }

}
