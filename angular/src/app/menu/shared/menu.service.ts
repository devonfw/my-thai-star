import { IDishesDataService } from '../../shared/backend/dishes/dishes-data-service';
import { Dish } from '../../shared/backend/dishes/dish';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DishView } from '../../shared/models/interfaces';
import { BusinessOperations } from '../../shared/BusinessOperations';

@Injectable()
export class MenuService {

  // TODO: Remove BusinessOperations from here
  BO: BusinessOperations = new BusinessOperations();

  // TODO: Remove Http dependency from here.
  constructor(private http: Http, private dishesDataService: IDishesDataService) {}


  getDishes(): Observable<DishView[]> {
    return this.dishesDataService.get()
            .map((dishes: Dish[]) => dishes as DishView[]); // TODO: Replace with a converter
  }

  postFilters(filters: FormGroup): Observable<any> {
    return this.http.post(this.BO.postfilters, filters)
                    .map((res: any) => res.json());
  }
}
