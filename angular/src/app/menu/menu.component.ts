import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MdSlider } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { MenuService } from './shared/menu.service';
import { DishView } from '../shared/viewModels/interfaces';

@Component({
  selector: 'public-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

    private menus: Observable<DishView[]>;
    private sortDir: string = 'DESC';
    private sortDirIcon: string = 'vertical_align_bottom';

    constructor (private menuService: MenuService) {
    }

    ngOnInit(): void {
      this.applyFilters(undefined);
    }

    changeSortDir(): void {
      this.sortDir = (this.sortDir === 'ASC') ? 'DESC' : 'ASC';
      this.sortDirIcon = (this.sortDirIcon === 'vertical_align_bottom') ? 'vertical_align_top' : 'vertical_align_bottom';
    }

    applyFilters(filters: any): void {
      this.menus = this.menuService.getDishes(this.menuService.composeFilters(filters, this.sortDir));
    }

    clearFilters(form: FormGroup, price: MdSlider, likes: MdSlider): void {
      likes.value = 0;
      price.value = 0;
      form.reset();
      this.applyFilters(undefined);
    }
}
