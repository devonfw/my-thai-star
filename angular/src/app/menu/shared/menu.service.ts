import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { DishesDataService } from '../../shared/backend/dishes/dishes-data-service';
import { Filter } from '../../shared/backend/backendModels/interfaces';
import { DishView, ExtraView, OrderView } from '../../shared/viewModels/interfaces';
import { map, remove } from 'lodash';

@Injectable()
export class MenuService {

  constructor(private dishesDataService: DishesDataService) {}

  menuToOrder(menu: any): OrderView {
    return {
      dish: {
        idDish: menu.dish.id,
        name: menu.dish.name,
        price: menu.dish.price,
      },
      orderLine: {
        amount: 1,
        comment: '',
      },
      extras: menu.extras,
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
        sort: [{
          name: filter.sortName,
          direction: sortDir,
        }],
        maxPrice: filter.maxPrice,
        minLikes: filter.minLikes,
        isFav: filter.isFav,
      };
    } else {
      filtersComposed = {
        searchBy: undefined,
        sort: [],
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
            .map((dishes: DishView[]) => dishes as DishView[]); // TODO: Replace with a converter
  }
}
