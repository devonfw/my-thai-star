import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Dish } from './dish';
import { IDishesDataService } from './dishes-data-service';
import { dishes } from '../mock-data';

@Injectable()
export class DishesInMemoryService implements IDishesDataService {

  get(): Observable <Dish[]> {
   return Observable.of(dishes);
  }

}
