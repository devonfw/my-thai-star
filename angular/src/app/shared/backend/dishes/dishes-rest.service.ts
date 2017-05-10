import { Injectable, Injector } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BusinessOperations } from '../../BusinessOperations';
import { Dish } from './dish';
import {IDishesDataService} from './dishes-data-service-interface';

@Injectable()
export class DishesRestService implements IDishesDataService {

 private readonly dishesRestPath: string = '/dishes';

 private http: Http;

 constructor(private injector: Injector) {
   this.http = this.injector.get(Http);
 }

 get(): Observable<Dish[]> {
  return this.http.get(`${BusinessOperations.restServiceRoot}${this.dishesRestPath}`)
    .map((res: Response) => res.json());
 }

}
