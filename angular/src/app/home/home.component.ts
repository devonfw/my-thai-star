import { Router } from '@angular/router';
import { Component } from '@angular/core';

interface Tile {
  title: string;
  content: string;
  img: string;
  button: string;
  navigate: Function;
}

@Component({
  selector: 'public-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  tiles: any = {
    restaurant: {
      title: 'home.restaurantTitle',
      content: 'home.restaurantContent',
      img: '../../assets/images/thai-restaurant.jpg',
      button: 'buttons.bookTable',
      navigate: () => this.navigateTo('bookTable'),
    },
    menu: {
      title: 'home.menuTitle',
      content: 'home.menuContent',
      img: '../../assets/images/thai-restaurant-dish.jpg',
      button: 'buttons.viewMenu',
      navigate: () => this.navigateTo('menu'),
    },
  };

  constructor(private router: Router) {
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getTiles(): Tile[] {
    return Object.keys(this.tiles).map((key: string) => <Tile>this.tiles[key]);
  }

}
