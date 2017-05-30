import { Component, OnInit } from '@angular/core';
import { MdSlider } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { MenuService } from './shared/menu.service';
import { DishView, Filter } from '../shared/viewModels/interfaces';

@Component({
  selector: 'public-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

    menus: DishView[] = [];
    sortDir: string = 'DESC';
    sortDirIcon: string = 'vertical_align_bottom';

    constructor (private menuService: MenuService) {
    }

    ngOnInit(): void {
      this.menuService.getDishes(this.menuService.composeFilters(undefined, this.sortDir)).subscribe((dishes: DishView[]) => {
        this.menus = dishes;
      });
    }

    changeSortDir(): void {
      this.sortDir = (this.sortDir === 'ASC') ? 'DESC' : 'ASC';
      this.sortDirIcon = (this.sortDirIcon === 'vertical_align_bottom') ? 'vertical_align_top' : 'vertical_align_bottom';
    }

    applyFilters(filters: any): void {
      this.menuService.getDishes(this.menuService.composeFilters(filters, this.sortDir))
                      .subscribe((data: DishView[]) => {
                        this.menus = data;
                      });
    }

    clearFilters(form: FormGroup, price: MdSlider, likes: MdSlider): void {
      likes.value = 0;
      price.value = 0;
      form.reset();
      this.menuService.getDishes(this.menuService.composeFilters(undefined, this.sortDir)).subscribe((dishes: DishView[]) => {
        this.menus = dishes;
      });
    }
}
