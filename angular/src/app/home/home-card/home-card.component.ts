import { Component, Input } from '@angular/core';

export interface Tile {
  titleKey: string;
  contentKey: string;
  img: string;
  buttonLabelKey: string;
  navigate: () => void;
}

@Component({
  selector: 'own-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent {
  @Input()
  tile: Tile;
}
