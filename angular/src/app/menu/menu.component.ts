import { FilterFormData } from './menu-filters/menu-filters.component';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from './shared/menu.service';
import { DishView } from '../shared/view-models/interfaces';
import { Filter, Pageable } from '../shared/backend-models/interfaces';
import { map } from 'rxjs/operators';

export interface Filters {
  searchBy: string;
  sortName: string;
  maxPrice: string;
  minLikes: string;
  isFav: string;
  sortDir: string;
}

/* @export
 * @class MenuComponent
 */
@Component({
  selector: 'public-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  dishes$: Observable<DishView[]>;

  /* Creates an instance of MenuComponent.
   * @param {MenuService} menuService
   * @memberof MenuComponent
   */
  constructor(private menuService: MenuService) {}

  /* @param {FilterFormData} filters
   * @memberof MenuComponent
   */
  onFilterChange(filters: FilterFormData): void {
    const pageable: Pageable = {
      pageSize: 8,
      pageNumber: 0,
      sort: [
        {
          property: filters.sort.property,
          direction: filters.sort.direction,
        },
      ],
    };
    const composedFilters: Filter = this.menuService.composeFilters(
      pageable,
      filters,
    );
    this.dishes$ = this.menuService.getDishes(composedFilters).pipe(
      map((res) => {
        if (!res) {
          return [];
        } else {
          return res.content;
        }
      }),
    );
  }
}
