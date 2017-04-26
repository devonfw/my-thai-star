import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenuService {

  constructor(private http: Http) {
  }

  getDishes(): Observable<any> {
    return this.http.get('/v1/getdishes')
                    .map((res: any) => res.json());
  }

}
