import { Component, OnInit } from '@angular/core';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { MenuService } from './shared/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    menus: any = [];
    searchInputTerm: string;

    constructor (private menuService: MenuService) {
    }

    ngOnInit(): void {
      this.menuService.getDishes().subscribe((data: any) => {
        this.menus = data.dishes;
      });
    }

    applyFilters(filters): void {
      filters.searchTerm = this.searchInputTerm;
    }

    clearFilters(form, search, price, likes): void {
      form.reset();
      search.value = undefined;
      likes.value = 0;
      price.value = 0;
    }

}
