import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DishView, ExtraView } from 'app/shared/view-models/interfaces';

@Component({
  selector: 'own-menu-card-details',
  templateUrl: './menu-card-details.component.html',
  styleUrls: ['./menu-card-details.component.scss'],
})
export class MenuCardDetailsComponent {
  @Input() menuInfo: DishView;
  @Output() clickOrder: EventEmitter<DishView> = new EventEmitter<DishView>();
  @Output() selectExtra: EventEmitter<ExtraView> = new EventEmitter<ExtraView>();

  onSelectExtra(extra: ExtraView): void {
    this.selectExtra.emit(extra);
  }

  onClickOrder(): void {
    this.clickOrder.emit(this.menuInfo);
  }
}
