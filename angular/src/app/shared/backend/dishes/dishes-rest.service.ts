import { Injectable, Injector } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Dish } from './dish';
import { Filter } from './filter';
import {IDishesDataService} from './dishes-data-service-interface';
import { config } from '../../../config';

@Injectable()
export class DishesRestService implements IDishesDataService {

 private readonly dishesRestPath: string = '/dishes';
 private readonly filtersRestPath: string = '/filter';

 private http: Http;

 constructor(private injector: Injector) {
   this.http = this.injector.get(Http);
 }

 get(): Observable<Dish[]> {
   return this.http.get(`${config.restServiceRoot}${this.dishesRestPath}`)
                   .map((res: Response) => res.json());
 }

 filter(filters: Filter): Observable<Dish[]> {
    return this.http.post(`${config.restServiceRoot}${this.filtersRestPath}`, {filters: filters})
                    .map((res: Response) => res.json());
 }

}
