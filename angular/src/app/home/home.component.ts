import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Tile } from './home-card/home-card.component';
/* @export
 * @class HomeComponent
 */
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

  /* Creates an instance of HomeComponent.
   * @param {Router} router
   * @memberof HomeComponent
   */
  constructor(private router: Router) {}

  /* @param {string} route
   * @memberof HomeComponent
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  /* @returns {TileWithNavigation[]}
   * @memberof HomeComponent
   */
  getTiles(): TileWithNavigation[] {
    return Object.keys(this.tiles).map((key) => this.tiles[key]);
  }
}

/* @interface TileWithNavigation
 * @extends {Tile}
 */
interface TileWithNavigation extends Tile {
  navigate: () => void;
}
/* @interface HomePageTiles
 */
interface HomePageTiles {
  restaurant: TileWithNavigation;
  menu: TileWithNavigation;
}
