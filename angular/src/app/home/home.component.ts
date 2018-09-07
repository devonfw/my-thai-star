import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Tile } from './home-card/home-card.component';
@Component({
  selector: 'public-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  tiles: HomePageTiles = {
    restaurant: {
      titleKey: 'home.restaurantTitle',
      contentKey: 'home.restaurantContent',
      img: './assets/images/thai-restaurant.jpg',
      buttonLabelKey: 'buttons.bookTable',
      navigate: () => this.navigateTo('bookTable'),
    },
    menu: {
      titleKey: 'home.menuTitle',
      contentKey: 'home.menuContent',
      img: './assets/images/thai-restaurant-dish.jpg',
      buttonLabelKey: 'buttons.viewMenu',
      navigate: () => this.navigateTo('menu'),
    },
  };

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getTiles(): TileWithNavigation[] {
    return Object.keys(this.tiles).map((key) => this.tiles[key]);
  }
}

interface TileWithNavigation extends Tile {
  navigate: () => void;
}
interface HomePageTiles {
  restaurant: TileWithNavigation;
  menu: TileWithNavigation;
}
