import { filter } from 'rxjs/operator/filter';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';
import { IDishesDataService } from './dishes-data-service-interface';
import { Dish, Filter } from '../backendModels/interfaces';
import { dishes } from '../mock-data';
import { orderBy, matches, includes, find } from 'lodash';

@Injectable()
export class DishesInMemoryService implements IDishesDataService {

  get(): Observable <Dish[]> {
   return Observable.of(dishes);
  }

  filter( filters: Filter): Observable <Dish[]> {
    // The category filters code probably could be improved
    return Observable.of(orderBy(dishes, [filters.sortBy.name], [filters.sortBy.dir])
                          .filter((dish: Dish) => {
                            if (filters.searchBy) {
                              return dish.name.toLowerCase().includes(filters.searchBy.toLowerCase());
                            } else {
                              return true;
                            }
                          }).filter((dish: Dish) => {
                            return dish.price > filters.maxPrice;
                          }).filter((dish: Dish) => {
                            return dish.likes > filters.minLikes;
                          }).filter( (dish: Dish) => {
                            if (filters.categories) {
                              return filters.categories.every( (category: {id: string}) => {
                                return find(dish.categories, category);
                              });
                            } else {
                              return true;
                            }
                          }));
  }

}
