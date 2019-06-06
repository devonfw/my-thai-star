import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DishView, ExtraView} from 'app/shared/view-models/interfaces';
import {Filter, Pageable} from 'app/shared/backend-models/interfaces';
import {Store} from '@ngrx/store';
import * as fromOrder from 'app/sidenav/store/selectors';
import * as fromMenu from 'app/menu/store/selectors';
import * as fromApp from 'app/store/reducers';
import {Order} from '../../sidenav/models/order.model';
import {MenuService} from '../services/menu.service';
import {SidenavService} from '../../sidenav/services/sidenav.service';
import {FilterFormData} from '../components/menu-filters/menu-filters.component';
import {LoadMenus} from '../store/actions/menu.actions';
import {AddOrder, UpdateOrder} from '../../sidenav/store/actions/order.actions';

export interface Filters {
  searchBy: string;
  sortName: string;
  maxPrice: string;
  minLikes: string;
  isFav: string;
  sortDir: string;
}

@Component({
  selector: 'public-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  dishes$: Observable<DishView[]> = this.store.select(fromMenu.getDishes);
  orders$: Observable<Order[]>;
  orders: Order[];
  menuInfo: DishView;
  extras: ExtraView[] = [];

  constructor(
    private store: Store<fromApp.State>,
    private menuService: MenuService,
    private sidenav: SidenavService,
  ) {}

  ngOnInit(): void {
    this.orders$ = this.store.select(fromOrder.selectAll);
    this.store.select(fromOrder.selectAll).subscribe(orders => this.orders = orders);
  }

  onFilterChange(filters: FilterFormData): void {
    const pageable: Pageable = {
      pageSize: 8,
      pageNumber: 0,
      sort: [
        {
          property: filters.sort.property,
          direction: filters.sort.direction,
        },
      ],
    };
    const composedFilters: Filter = this.menuService.composeFilters(
      pageable,
      filters,
    );

    this.store.dispatch(new LoadMenus(composedFilters));
  }

  idExist(id: number): any {
    if (this.orders.find(orderId => orderId.order.dish.id === id)) {
      return true;
    }
    return false;
  }

  onExtraSelected(extra: ExtraView): void {
    const modifiedExtraIndex: number = this.extras.indexOf(extra);
    const oldExtra: ExtraView = this.extras[modifiedExtraIndex];
    this.extras[modifiedExtraIndex] = {
      ...oldExtra,
      ...{ selected: !oldExtra.selected },
    };
  }

  onOrderAdded(order: any) {
    const orderView = this.menuService.menuToOrder(order);
    if (this.idExist(orderView.dish.id) === false) {
      this.store.dispatch(new AddOrder({
        order: {
          id: orderView.dish.id,
          order: {
            ...orderView,
            extras: this.extras
          }
        }
      }));
    } else {
      const orderDish: Order = this.orders.find(orderId => orderId.id === orderView.dish.id);
      this.store.dispatch(new UpdateOrder({
        order: {
          id: orderView.dish.id,
          changes: {
            order: {
              ...orderDish.order,
              orderLine: {
                ...orderDish.order.orderLine,
                amount: orderDish.order.orderLine.amount + 1
              },
            }
          }
        }
      }));
    }
    this.sidenav.openSideNav();
  }
}
