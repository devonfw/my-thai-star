import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSlider, MatInput } from '@angular/material';
import { Observable } from 'rxjs';
import { MenuService } from './shared/menu.service';
import { DishView } from '../shared/viewModels/interfaces';
import { Filter } from '../shared/backendModels/interfaces';

@Component({
  selector: 'public-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menus: Observable<DishView[]>;
  sortDir: string = 'DESC';
  sortDirIcon: string = 'vertical_align_bottom';

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.applyFilters();
  }

  changeSortDir(): void {
    this.sortDir = this.sortDir === 'ASC' ? 'DESC' : 'ASC';
    this.sortDirIcon =
      this.sortDirIcon === 'vertical_align_bottom'
        ? 'vertical_align_top'
        : 'vertical_align_bottom';
  }

  applyFilters(filters?: any): void {
    const composedFilters: Filter = this.menuService.composeFilters(
      filters,
      this.sortDir,
    );
    this.menus = this.menuService.getDishes(composedFilters);
  }

  clearFilters(form: FormGroup, price: MatSlider, likes: MatSlider): void {
    likes.value = 0;
    price.value = 0;
    form.reset();
    this.applyFilters();
  }

  clearSearchField(searchBy: MatInput): void {
    searchBy.value = '';
  }
}
