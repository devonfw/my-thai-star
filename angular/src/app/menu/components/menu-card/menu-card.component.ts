import {Component, EventEmitter, Input, Output} from '@angular/core';
import { DishView, ExtraView } from 'app/shared/view-models/interfaces';

@Component({
  selector: 'public-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
})
export class MenuCardComponent {
  @Input() extras: ExtraView;
  @Input() menuInfo: DishView;
  @Input() auth: boolean;
  @Output() orderAdded = new EventEmitter<any>();
  @Output() extraSelected = new EventEmitter<any>();

  constructor(
  ) {}

  changeFavouriteState(): void {
    this.menuInfo.isfav = !this.menuInfo.isfav;
  }

  selectedOption(extra: ExtraView): void {
    extra.selected = !extra.selected;
  }

  addOrderMenu(): void {
    this.orderAdded.emit(this.menuInfo);
  }

  receiveExtra($event) {
    this.extras = $event;
    this.extraSelected.emit(this.extras);
  }

  addSelectExtra(): void {
    this.extraSelected.emit(this.extras);
  }
}
