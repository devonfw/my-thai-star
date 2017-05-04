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
      this.menuService.postFilters(filters).subscribe((data: any) => {
        this.menus = data.dishes;
      });
    }

    clearFilters(form, search, price, likes): void {
      likes.value = 0;
      price.value = 0;
      form.reset();
      this.menuService.postFilters(form.value).subscribe((data: any) => {
        this.menus = data.dishes;
      });
    }

    changeExpandIcon(): void {
      this.expandIcon = (this.expandIcon === 'expand_more') ? 'expand_less' : 'expand_more';
    }

}
