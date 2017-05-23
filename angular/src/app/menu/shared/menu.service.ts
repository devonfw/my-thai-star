import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { DishesDataService } from '../../shared/backend/dishes/dishes-data-service';
import { Dish, Filter } from '../../shared/backend/backendModels/interfaces';
import { DishView, ExtraView, OrderView } from '../../shared/viewModels/interfaces';
import { map, remove } from 'lodash';

@Injectable()
export class MenuService {

  constructor(private dishesDataService: DishesDataService) {}

  menuToOrder(menu: DishView): OrderView {
    return {
      name: menu.name,
      price: menu.price,
      extras: menu.extras,
      amount: 1,
      comment: '',
    };
  }

  composeFilters(filter: any, sortDir: string): any {
    let categories: any = [];
    map(filter, (value: boolean, field: string) => {
      if (value === true) {
        categories.push({id: field});
      }
    });

    let filtersComposed: Filter = {
      categories: categories,
      searchBy: filter.searchBy,
      sortBy: {
        name: filter.sortName,
        dir: sortDir,
      },
      maxPrice: filter.maxPrice,
      minLikes: filter.minLikes,
      isFav: filter.isFav,
    };
    return filtersComposed;
  }

  clearSelectedExtras(menuInfo: DishView): void {
    map(menuInfo.extras, (extra: ExtraView) => { extra.selected = false; });
  }

  getDishes(): Observable<DishView[]> {
    return this.dishesDataService.get()
            .map((dishes: Dish[]) => dishes as DishView[]); // TODO: Replace with a converter
  }

  postFilters(filters: any): Observable<any> {
    return this.dishesDataService.filter(filters)
            .map((dishes: Dish[]) => dishes as DishView[]); // TODO: Replace with a converter
  }
}
