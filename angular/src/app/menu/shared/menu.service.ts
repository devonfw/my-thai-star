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
      idDish: menu.id,
      name: menu.name,
      price: menu.price,
      extras: menu.extras,
      amount: 1,
      comment: '',
    };
  }

  composeFilters(filter: any, sortDir: string): any {
    let filtersComposed: Filter;
    let categories: any = [];
    if (filter) {
      map(filter, (value: boolean, field: string) => {
        if (value === true) {
          categories.push({id: field});
        }
      });

      filtersComposed = {
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
    } else {
      filtersComposed = {
        searchBy: undefined,
        sortBy: {name: '', dir: ''},
        maxPrice: undefined,
        minLikes: undefined,
        isFav: undefined,
        categories: categories,
      };
    }
    return  filtersComposed;
  }

  clearSelectedExtras(menuInfo: DishView): void {
    map(menuInfo.extras, (extra: ExtraView) => { extra.selected = false; });
  }

  getDishes(filters: any): Observable<DishView[]> {
    return this.dishesDataService.filter(filters)
            .map((dishes: Dish[]) => dishes as DishView[]); // TODO: Replace with a converter
  }
}
