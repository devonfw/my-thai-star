import { filter } from 'rxjs/operator/filter';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';
import { IDishesDataService } from './dishes-data-service-interface';
import { Dish, Filter } from '../backendModels/interfaces';
import { dishes } from '../mock-data';
import { orderBy, matches, includes, find } from 'lodash';

@Injectable()
export class DishesInMemoryService implements IDishesDataService {

  filter( filters: Filter): Observable <Dish[]> {
    return Observable.of(orderBy(dishes, [filters.sortBy.name], [filters.sortBy.dir])
                          .filter((dish: Dish) => {
                            if (filters.searchBy) {
                              return dish.name.toLowerCase().includes(filters.searchBy.toLowerCase());
                            } else {
                              return true;
                            }
                          }).filter((dish: Dish) => {
                            if (filters.maxPrice) {
                              return dish.price > filters.maxPrice;
                            } else {
                              return true;
                            }
                          }).filter((dish: Dish) => {
                            if (filters.minLikes) {
                              return dish.likes > filters.minLikes;
                            } else {
                              return true;
                            }
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
