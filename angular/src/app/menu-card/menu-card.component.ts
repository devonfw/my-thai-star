import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent {

  favouriteSelected: boolean = false;

  changeFavouriteState(): void {
    this.favouriteSelected = !this.favouriteSelected;
  }

}
