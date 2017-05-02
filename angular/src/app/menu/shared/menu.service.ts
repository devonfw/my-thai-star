import { BusinessOperations } from '../../shared/BusinessOperations';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenuService {

  BO: BusinessOperations = new BusinessOperations();

  constructor(private http: Http) {
  }

  getDishes(): Observable<any> {
    return this.http.get(this.BO.getdishes)
                    .map((res: any) => res.json());
  }

  postFilters(filters): Observable<any> {
    return this.http.post(this.BO.postfilters, filters)
                    .map((res: any) => res.json());
  }
}
