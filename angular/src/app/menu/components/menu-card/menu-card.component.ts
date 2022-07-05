import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DishView, ExtraView } from '../../../shared/view-models/interfaces';

@Component({
  selector: 'app-public-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
})
export class MenuCardComponent {
  @Input() extras: ExtraView;
  @Input() menuInfo: DishView;
  @Input() auth: boolean;
  @Output() orderAdded = new EventEmitter<DishView>();
  @Output() extraSelected = new EventEmitter<{ dish: DishView, extra: ExtraView}>();

  constructor() {}

  changeFavouriteState(): void {
    this.menuInfo.isfav = !this.menuInfo.isfav;
  }

  selectedOption(extra: ExtraView): void {
    const dish = this.menuInfo;
    this.extraSelected.emit({ dish, extra });
  }

  addOrderMenu(): void {
    this.orderAdded.emit(this.menuInfo);
  }
}
