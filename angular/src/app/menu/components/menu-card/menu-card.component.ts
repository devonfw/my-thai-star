import {Component, EventEmitter, Input, Output} from '@angular/core';
import { DishView, ExtraView } from 'app/shared/view-models/interfaces';
import { AuthService } from '../../../core/authentication/auth.service';

@Component({
  selector: 'public-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
})
export class MenuCardComponent {
  @Input() menuInfo: DishView;
  @Output() orderAdded = new EventEmitter<any>();

  constructor(
    public auth: AuthService,
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
}
