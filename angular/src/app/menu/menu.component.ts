import { Component } from '@angular/core';
import {MenuCardComponent} from './menu-card/menu-card.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    menus = [{
      orderName: 'Red Curry',
      orderDescription: 'Lorem ipsum dolor sit amet. Proin fermentum lobortis neque. Pellentesque habitant morbi tristique.',
      price: 5.90,
      image: '../../assets/images/basil-fried.jpg',
      options: [{name: 'Tofu', price: 1, selected: false}, {name: 'Chiken', price: 1, selected: false}, {name: 'Pork', price: 2, selected: false}],
      likes: 21,
      favourite: false
    }, {
      orderName: 'Purple Curry',
      orderDescription: 'Consectetur adipiscing elit. Nulla id viverra turpis, sed eleifend dui. Proin fermentum lobortis neque. Pellentesque habitant morbi tristique.',
      price: 9.00,
      image: '../../assets/images/garlic-paradise.jpg',
      options: [{name: 'Tofu', price: 1, selected: false}, {name: 'Chiken', price: 1, selected: false}, {name: 'Pork', price: 2, selected: false}],
      likes: 10,
      favourite: false
    }, {
      orderName: 'Green Curry',
      orderDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id viverra turpis, sed eleifend dui. Proin fermentum lobortis neque.',
      price: 7.60,
      image: '../../assets/images/green-curry.jpg',
      options: [{name: 'Tofu', price: 1, selected: false}, {name: 'Chiken', price: 1, selected: false}, {name: 'Pork', price: 2, selected: false}],
      likes: 61,
      favourite: false
    },{
      orderName: 'Yellow Curry',
      orderDescription: 'Lorem ipsum dolor. Pellentesque habitant morbi tristique.',
      price: 8.50,
      image: '../../assets/images/dish.png',
      options: [{name: 'Tofu', price: 1, selected: false}, {name: 'Chiken', price: 1, selected: false}, {name: 'Pork', price: 2, selected: false}],
      likes: 48,
      favourite: false
    }]
  
}
