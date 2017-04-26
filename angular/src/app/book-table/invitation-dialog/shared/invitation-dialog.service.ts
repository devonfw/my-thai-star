import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class InvitationDialogService {

  constructor(private http: Http) {
  }

  getTableId(): Observable<any> {
    return this.http.get('/v1/getbookingid')
                    .map((res: any) => res.json());
  }

}
