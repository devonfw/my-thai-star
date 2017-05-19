import { filter } from 'rxjs/operator/filter';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Dish } from './dish';
import { Filter } from './filter';
import {IDishesDataService} from './dishes-data-service-interface';
import { dishes } from '../mock-data';
import * as _ from 'lodash';

@Injectable()
export class DishesInMemoryService implements IDishesDataService {

  get(): Observable <Dish[]> {
   return Observable.of(dishes);
  }

  filter( filters: Filter): Observable <Dish[]> {
    // The category filters code probably could be improved
    return Observable.of(_.orderBy(dishes, [filters.sortBy.name], [filters.sortBy.dir])
                          .filter((dish: Dish) => {
                            if (filters.searchTerm) {
                              return dish.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
                            } else {
                              return dishes;
                            }
                          }).filter((dish: Dish) => {
                            if (filters.main) {
                              return dish.categories.main === filters.main;
                            } else {
                              return dishes;
                            }
                          }).filter((dish: Dish) => {
                            if (filters.starter) {
                              return dish.categories.starter === filters.starter;
                            } else {
                              return dishes;
                            }
                          }).filter((dish: Dish) => {
                            if (filters.dessert) {
                              return dish.categories.dessert === filters.dessert;
                            } else {
                              return dishes;
                            }
                          }).filter((dish: Dish) => {
                            if (filters.noodle) {
                              return dish.categories.noodle === filters.noodle;
                            } else {
                              return dishes;
                            }
                          }).filter((dish: Dish) => {
                            if (filters.rice) {
                              return dish.categories.rice === filters.rice;
                            } else {
                              return dishes;
                            }
                          }).filter((dish: Dish) => {
                            if (filters.curry) {
                              return dish.categories.curry === filters.curry;
                            } else {
                              return dishes;
                            }
                          }).filter((dish: Dish) => {
                            if (filters.vegan) {
                              return dish.categories.vegan === filters.vegan;
                            } else {
                              return dishes;
                            }
                          }).filter((dish: Dish) => {
                            if (filters.vegetarian) {
                              return dish.categories.vegetarian === filters.vegetarian;
                            } else {
                              return dishes;
                            }
                          }).filter((dish: Dish) => {
                            if (filters.favourite) {
                              return dish.isfav === filters.favourite;
                            } else {
                              return dishes;
                            }
                          }).filter((dish: Dish) => {
                            return dish.price > filters.price;
                          }).filter((dish: Dish) => {
                            return dish.likes > filters.likes;
                          }));
  }

}
