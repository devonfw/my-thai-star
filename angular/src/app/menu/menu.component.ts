import { FilterFormData } from './menu-filters/menu-filters.component';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from './shared/menu.service';
import { DishView } from '../shared/viewModels/interfaces';
import { Filter } from '../shared/backendModels/interfaces';
import { map } from 'rxjs/operators';

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
  ) {}

  onFilterChange(filters: FilterFormData): void {
    const composedFilters: Filter = this.menuService.composeFilters(filters);
    this.dishes$ = this.menuService.getDishes(composedFilters).pipe(
      map((res) => res.result),
    );
  }
}
