import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DishView, ExtraView } from 'app/shared/view-models/interfaces';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-own-menu-card-details',
  templateUrl: './menu-card-details.component.html',
  styleUrls: ['./menu-card-details.component.scss'],
})
export class MenuCardDetailsComponent {
  @Input() menuInfo: DishView;
  @Output() clickOrder: EventEmitter<DishView> = new EventEmitter<DishView>();
  @Output() selectExtra: EventEmitter<ExtraView> = new EventEmitter<
    ExtraView
  >();

  onToggleExtra(extra: ExtraView, event: MatCheckboxChange): void {
    const modifiedExtra = this.menuInfo.extras.find((e) => e.id === extra.id);
    const item = Object.assign({
      ...modifiedExtra,
      selected: event.checked,
    });
    this.selectExtra.emit(item);
  }

  onClickOrder(): void {
    this.clickOrder.emit(this.menuInfo);
  }
}
