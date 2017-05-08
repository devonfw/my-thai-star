import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { MenuService } from './shared/menu.service';
import { DishView } from '../shared/models/interfaces';
import { MdSlider } from '@angular/material';

@Component({
  selector: 'public-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

    menus: DishView[] = [];
    expandIcon: string = 'expand_more';

    constructor (private menuService: MenuService) {
    }

    ngOnInit(): void {
      this.menuService.getDishes().subscribe((dishes: DishView[]) => {
        this.menus = dishes;
      });
    }

    applyFilters(filters: FormGroup): void {
      this.menuService.postFilters(filters).subscribe((data: any) => {
        this.menus = data.dishes;
      });
    }

    clearFilters(form: FormGroup, price: MdSlider, likes: MdSlider): void {
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
