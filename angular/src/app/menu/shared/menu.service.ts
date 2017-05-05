import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BusinessOperations } from '../../shared/BusinessOperations';

@Injectable()
export class MenuService {

  BO: BusinessOperations = new BusinessOperations();

  constructor(private http: Http) {
  }

  // Remark: Dishes model missing, a type should be already defined.
  // Remark: There should be a separate Dishes service, abstracting the way how reservations are retrieved
  // and injectable indepedently to other components.
  getDishes(): Observable<any> {
    return this.http.get(this.BO.getdishes)
                    .map((res: any) => res.json());
  }

  postFilters(filters: FormGroup): Observable<any> {
    return this.http.post(this.BO.postfilters, filters)
                    .map((res: any) => res.json());
  }
}
