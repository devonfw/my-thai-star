import { DishesDataService } from '../../shared/backend/dishes/dishes-data-service';
import { Dish } from '../../shared/backend/dishes/dish';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DishView } from '../../shared/models/interfaces';
import { BusinessOperations } from '../../shared/BusinessOperations';

@Injectable()
export class MenuService {

  constructor(private dishesDataService: DishesDataService) {}

  getDishes(): Observable<DishView[]> {
    return this.dishesDataService.get()
            .map((dishes: Dish[]) => dishes as DishView[]); // TODO: Replace with a converter
  }

  postFilters(filters: any): Observable<any> {
    return this.dishesDataService.filter(filters)
            .map((dishes: Dish[]) => dishes as DishView[]); // TODO: Replace with a converter
  }
}
