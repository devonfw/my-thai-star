import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookTableDialogService {

  constructor(private http: Http) {
  }

  getTableId(): Observable<any> {
    return this.http.get('/v1/getbookingid')
                    .map((res: any) => res.json());
  }

}
