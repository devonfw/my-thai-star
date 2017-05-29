import { Dish, Filter } from '../backendModels/interfaces';
import { Injectable, Injector } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {IDishesDataService} from './dishes-data-service-interface';
import { config } from '../../../config';

@Injectable()
export class DishesRestService implements IDishesDataService {

 private readonly filtersRestPath: string = '/Dish/Search';

 private http: Http;

 constructor(private injector: Injector) {
   this.http = this.injector.get(Http);
 }

 filter(filters: Filter): Observable<Dish[]> {
    return this.http.post(`${config.restServiceRoot}${this.filtersRestPath}`, {filters: filters})
                    .map((res: Response) => res.json());
 }

}
