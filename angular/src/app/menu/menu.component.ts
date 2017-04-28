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
    expandIcon: string = 'expand_more';

    constructor (private menuService: MenuService) {
    }

    ngOnInit(): void {
      this.menuService.getDishes().subscribe((data: any) => {
        this.menus = data.dishes;
      });
    }

    applyFilters(filters): void {
      // call to filter function service
    }

    clearFilters(form, search, price, likes): void {
      form.reset();
      likes.value = 0;
      price.value = 0;
    }

    changeExpandIcon(): void {
      this.expandIcon === 'expand_more' ? this.expandIcon = 'expand_less' : this.expandIcon = 'expand_more';
    }

}
