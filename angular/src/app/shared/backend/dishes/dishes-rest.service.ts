import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BusinessOperations } from '../../BusinessOperations';
import { Dish } from './dish';
import { IDishesDataService } from './dishes-data-service';

@Injectable()
export class DishesRestService implements IDishesDataService {

 private readonly dishesRestPath: string = '/dishes';

 constructor(private http: Http) {};

 get(): Observable<Dish[]>{
  return this.http.get(`${BusinessOperations.restServiceRoot}${this.dishesRestPath}`)
    .map((res: any) => res.json());
 }

}
