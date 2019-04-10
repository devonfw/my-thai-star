import {Component, Input, OnInit} from '@angular/core';
import { DishView, ExtraView } from 'app/shared/view-models/interfaces';
import { SidenavService } from '../../sidenav/services/sidenav.service';
import { MenuService } from '../services/menu.service';
import { AuthService } from '../../core/authentication/auth.service';
import * as fromOrder from 'app/menu/store/reducers/order.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AddOrder, LoadOrders, UpdateOrder} from '../store/actions/order.actions';
import { UUID } from 'angular2-uuid';
import {LoadOrderMenus} from '../../sidenav/store/actions/order-menu.actions';
import {Order} from '../models/order.model';
import {map} from 'rxjs/operators';
import {forEach} from '@angular-devkit/schematics';

@Component({
  selector: 'public-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
})
export class MenuCardComponent implements OnInit {
  @Input() menuInfo: DishView;
  orders$: Observable<Order[]>;
  orders: Order[];

  constructor(
    private menuService: MenuService,
    public auth: AuthService,
    private sidenav: SidenavService,
    private store: Store<fromOrder.State>
  ) {}

  ngOnInit(): void {
    this.orders$ = this.store.select(fromOrder.selectAll);
    this.store.select(fromOrder.selectAll).subscribe(orders => this.orders = orders);
  }

  idExist(id: number): any {
    if (this.orders.find(orderId => orderId.order.dish.id === id)) {
      return true;
    }
    return false;
  }

  addOrderMenu(): void {
    if (this.idExist(this.menuService.menuToOrder(this.menuInfo).dish.id) === false) {
      this.store.dispatch(new AddOrder({
        order: {
          id: this.menuService.menuToOrder(this.menuInfo).dish.id,
          order: {
            dish: this.menuService.menuToOrder(this.menuInfo).dish,
            orderLine: this.menuService.menuToOrder(this.menuInfo).orderLine,
            extras: this.menuService.menuToOrder(this.menuInfo).extras
          }
        }
      }));
    } else {
      const orderDish: Order = this.orders.find(orderId => orderId.id === this.menuService.menuToOrder(this.menuInfo).dish.id);
      this.store.dispatch(new UpdateOrder({
        order: {
          id: this.menuService.menuToOrder(this.menuInfo).dish.id,
          changes: {
            order: {
              dish: {
                id: orderDish.order.dish.id,
                price: orderDish.order.dish.price,
                name: orderDish.order.dish.name
              },
              orderLine: {
                amount: orderDish.order.orderLine.amount + 1,
                comment: orderDish.order.orderLine.comment,
              },
              extras: orderDish.order.extras
            }
          }
        }
      }));
    }

    this.sidenav.openSideNav();
  }

  changeFavouriteState(): void {
    this.menuInfo.isfav = !this.menuInfo.isfav;
  }

  selectedOption(extra: ExtraView): void {
    extra.selected = !extra.selected;
  }
}
