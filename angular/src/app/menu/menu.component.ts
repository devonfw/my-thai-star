import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { MenuService } from './shared/menu.service';
import { DishView, Filter } from '../shared/models/interfaces';
import { MdSlider } from '@angular/material';

@Component({
  selector: 'public-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

    menus: DishView[] = [];
    sortDir: string = 'desc';
    sortDirIcon: string = 'vertical_align_bottom';

    constructor (private menuService: MenuService) {
    }

    ngOnInit(): void {
      this.menuService.getDishes().subscribe((dishes: DishView[]) => {
        this.menus = dishes;
      });
    }

    changeSortDir(): void {
      this.sortDir = (this.sortDir === 'desc') ? 'asc' : 'desc';
      this.sortDirIcon = (this.sortDirIcon === 'vertical_align_bottom') ? 'vertical_align_top' : 'vertical_align_bottom';
    }

    applyFilters(filters: any): void {
      filters.sortBy = {};
      filters.sortBy.name = filters.sortName;
      filters.sortBy.dir = this.sortDir;
      this.menuService.postFilters(filters).subscribe((data: any) => {
        this.menus = data;
      });
    }

    clearFilters(form: FormGroup, price: MdSlider, likes: MdSlider): void {
      likes.value = 0;
      price.value = 0;
      form.reset();
      this.menuService.getDishes().subscribe((dishes: DishView[]) => {
        this.menus = dishes;
      });
    }
}
