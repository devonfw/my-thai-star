import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DishView, ExtraView, OrderView } from '../../shared/view-models/interfaces';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Filter, Pageable } from 'app/shared/backend-models/interfaces';
import { FilterFormData } from '../components/menu-filters/menu-filters.component';
import { ConfigService } from '../../core/config/config.service';

const categoryNameToServerId: {[key: string]: number} = Object.freeze({
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
  private readonly restServiceRoot: string;
  private readonly filtersRestPath: string = 'dishmanagement/v1/dish/search';

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.restServiceRoot = this.configService.getValues().restServiceRoot;
   }

  menuToOrder(menu: DishView): OrderView {
    return {
      dish: menu.dish,
      extras: menu.extras,
      orderLine: {
        amount: 1,
        comment: '',
      },
    };
  }

  composeFilters(pageable: Pageable, filters: FilterFormData): Filter {
    const categories: { id: string }[] = Object.keys(filters.categories)
        .filter((categoryKey: string) => filters.categories[categoryKey])
        .map((categoryKey: string) => ({id: categoryNameToServerId[categoryKey].toString()}));
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

  clearSelectedExtras(menuInfo: DishView): void {
    menuInfo.extras.map((extra: ExtraView) => { extra.selected = false; });
  }

  getDishes(filters: Filter): Observable<{ pageable: Pageable, content: DishView[]}> {
    return this.http.post<{ pageable: Pageable, content: DishView[]}>(
      `${this.restServiceRoot}${this.filtersRestPath}`,
      filters,
    );
  }
}
