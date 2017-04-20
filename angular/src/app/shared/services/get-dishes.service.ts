import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetDishesService {

  constructor(
    private http: Http
  ) { }

  getDishes () : Observable<any> {
    return this.http.get('/v1/getdishes')
                    .map(res => res.json());
  }

}
