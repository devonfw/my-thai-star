import {Component, Input, OnInit} from '@angular/core';
import { DishView, ExtraView } from 'app/shared/view-models/interfaces';
import { SidenavService } from '../../sidenav/services/sidenav.service';
import { MenuService } from '../services/menu.service';
import { AuthService } from '../../core/authentication/auth.service';
import * as fromOrder from 'app/menu/store/reducers/order.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AddOrder} from '../store/actions/order.actions';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'public-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
})
export class MenuCardComponent implements OnInit{
  @Input() menuInfo: DishView;
  orders$: Observable<any>;

  constructor(
    private menuService: MenuService,
    public auth: AuthService,
    private sidenav: SidenavService,
    private store: Store<fromOrder.State>
  ) {}

  ngOnInit(): void {
    this.orders$ = this.store.select(fromOrder.selectAll);
  }

  createOrder() {
    this.store.dispatch(new AddOrder({order: {id: UUID.UUID(), order: this.menuService.menuToOrder(this.menuInfo)}}));
  }

  addOrderMenu(): void {
    this.store.dispatch(new AddOrder({order: {id: UUID.UUID(), order: this.menuService.menuToOrder(this.menuInfo)}}));
    this.sidenav.addOrder(this.menuService.menuToOrder(this.menuInfo));
    this.sidenav.openSideNav();
    this.menuService.clearSelectedExtras(this.menuInfo);
  }

  changeFavouriteState(): void {
    this.menuInfo.isfav = !this.menuInfo.isfav;
  }

  selectedOption(extra: ExtraView): void {
    extra.selected = !extra.selected;
  }
}
