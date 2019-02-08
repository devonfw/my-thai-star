import { Component, Input, Output, EventEmitter } from '@angular/core';

/* @export
 * @class HomeCardComponent
 */
@Component({
  selector: 'own-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent {
  @Input() tile: Tile;
  @Output() buttonClick: EventEmitter<Event> = new EventEmitter<Event>();

  /* @param {Event} event
   * @memberof HomeCardComponent
   */
  onButtonClick(event: Event): void {
    this.buttonClick.emit(event);
  }
}

/* @export
 * @interface Tile
 */
export interface Tile {
  titleKey: string;
  contentKey: string;
  img: string;
  buttonLabelKey: string;
}
