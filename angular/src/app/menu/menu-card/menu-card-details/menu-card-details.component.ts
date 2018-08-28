import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DishView, ExtraView } from '../../../shared/viewModels/interfaces';

@Component({
  selector: 'own-menu-card-details',
  templateUrl: './menu-card-details.component.html',
  styleUrls: ['./menu-card-details.component.scss'],
})
export class MenuCardDetailsComponent {

  @Input()
  menuInfo: DishView;

  @Output('clickOrder')
  orderEmitter: EventEmitter<DishView> = new EventEmitter<DishView>();

  onSelectExtra(extra: ExtraView): void {
    // extra.selected = !extra.selected;
    const modifiedExtraIndex: number = this.menuInfo.extras.indexOf(extra);
    const oldExtra: ExtraView = this.menuInfo.extras[modifiedExtraIndex];
    this.menuInfo.extras[modifiedExtraIndex] = {
      ...oldExtra,
      ...{selected: !oldExtra.selected },
    };

  }

  onClickOrder(): void {
    this.orderEmitter.emit(this.menuInfo);
  }
}
