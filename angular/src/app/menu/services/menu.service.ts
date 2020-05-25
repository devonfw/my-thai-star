import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter, Pageable } from 'app/shared/backend-models/interfaces';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import * as uuid from 'uuid';
import { ConfigService } from '../../core/config/config.service';
import { DishView } from '../../shared/view-models/interfaces';
import { FilterFormData } from '../components/menu-filters/menu-filters.component';
import { Order } from '../models/order.model';

const categoryNameToServerId: { [key: string]: number } = Object.freeze({
  mainDishes: 0,
  starters: 1,
  desserts: 2,
  noodle: 3,
  rice: 4,
  curry: 5,
  vegan: 6,
  vegetarian: 7,
  favourites: 8,
});

@Injectable()
export class MenuService {
  private readonly restServiceRoot$: Observable<
    string
  > = this.config.getRestServiceRoot();
  private readonly filtersRestPath: string = 'dishmanagement/v1/dish/search';

  constructor(private http: HttpClient, private config: ConfigService) {}

  menuToOrder(menu: DishView): Order {
    return {
      id: uuid.v4(),
      details: {
        dish: menu.dish,
        extras: menu.extras,
        orderLine: {
          amount: 1,
          comment: '',
        },
      },
    };
  }

  composeFilters(pageable: Pageable, filters: FilterFormData): Filter {
    const categories: { id: string }[] = Object.keys(filters.categories)
      .filter((categoryKey: string) => filters.categories[categoryKey])
      .map((categoryKey: string) => ({
        id: categoryNameToServerId[categoryKey].toString(),
      }));
    if (!filters.sort.property) {
      filters.sort = undefined;
      pageable.sort = undefined;
    }

    return {
      categories,
      searchBy: filters.searchBy,
      pageable,
      maxPrice: filters.maxPrice,
      minLikes: filters.minLikes,
      isFav: undefined, // TODO: what is this field? It was present in interface but setting it will cause errors ...
    };
  }

  getDishes(
    filters: Filter,
  ): Observable<{ pageable: Pageable; content: DishView[] }> {
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.post<{ pageable: Pageable; content: DishView[] }>(
          `${restServiceRoot}${this.filtersRestPath}`,
          filters,
        ),
      ),
    );
  }
}
