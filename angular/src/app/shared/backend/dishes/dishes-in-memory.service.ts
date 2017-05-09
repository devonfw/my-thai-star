import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Dish } from './dish';
import { Filter } from './filter';
import {IDishesDataService} from './dishes-data-service-interface';
import { dishes } from '../mock-data';

@Injectable()
export class DishesInMemoryService implements IDishesDataService {

  get(): Observable <Dish[]> {
   return Observable.of(dishes);
  }

  filter( filters: Filter): Observable <Dish[]> {
    // TODO: implement filtering function
    if (filters.searchTerm) {
      return Observable.of(dishes.slice(0, 1));
    } else {
      return Observable.of(dishes);
    }
  }

}
