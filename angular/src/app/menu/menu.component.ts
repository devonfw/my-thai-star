import { Component, OnInit } from '@angular/core';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { GetDishesService } from './../shared/services/get-dishes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
    menus = [];
    constructor (
      private service: GetDishesService
    ) { }

    ngOnInit() {
      this.service.getDishes().subscribe(data => {
        this.menus = data.dishes;
      });
    }
  
}
