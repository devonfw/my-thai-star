import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-own-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent {
  @Input() tile: Tile;
  @Output() buttonClick: EventEmitter<Event> = new EventEmitter<Event>();

  onButtonClick(event: Event): void {
    this.buttonClick.emit(event);
  }
}

export interface Tile {
  titleKey: string;
  contentKey: string;
  caption?: string;
  img: string;
  buttonLabelKey: string;
}
