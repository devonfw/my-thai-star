import { FilterFormData } from './menu-filters/menu-filters.component';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from './shared/menu.service';
import { DishView } from '../shared/view-models/interfaces';
import { Filter, Pageable } from '../shared/backend-models/interfaces';
import { AppState } from 'app/store/reducers';
import { getAllDishes } from './store/reducers/menu.reducer';
import { LoadMenuStart } from './store/actions/menu.actions';
import {Store} from '@ngrx/store';

export interface Filters {
  searchBy: string;
  sortName: string;
  maxPrice: string;
  minLikes: string;
  isFav: string;
  sortDir: string;
}

@Component({
  selector: 'public-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  dishes$: Observable<DishView[]>;

  constructor(
    private menuService: MenuService,
    private store: Store<AppState>
  ) {}

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

    this.store.dispatch(new LoadMenuStart(composedFilters));
    // this.dishes$ = this.menuService.getDishes(composedFilters).pipe(
    //   map((res) => {
    //     if (!res) {
    //       return [];
    //     } else {
    //       return res.content;
    //     }
    //   }),
    // );
  }
}
