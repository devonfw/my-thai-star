import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BusinessOperations } from '../../../shared/BusinessOperations';

@Injectable()
export class InvitationDialogService {

  BO: BusinessOperations = new BusinessOperations();

  constructor(private http: Http) {
  }

  getTableId(): Observable<any> {
    return this.http.get(this.BO.getbookingid)
                    .map((res: any) => res.json());
  }

  postInvitationTable(bookInfo): Observable<any> {
    return this.http.post(this.BO.postbookinginvitation, bookInfo)
                    .map((res: any) => res.json());
  }

}
