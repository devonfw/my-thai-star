import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Filter, Pageable } from 'app/shared/backend-models/interfaces';
import { isEqual } from 'lodash';
import { Observable } from 'rxjs';
import { DishView, ExtraView } from '../../shared/view-models/interfaces';
import { Order } from '../../sidenav/models/order.model';
import { SidenavService } from '../../sidenav/services/sidenav.service';
import * as fromOrder from '../../sidenav/store';
import * as fromApp from '../../store';
import * as fromAuth from '../../user-area/store';
import { FilterFormData } from '../components/menu-filters/menu-filters.component';
import { MenuService } from '../services/menu.service';
import * as fromMenu from '../store';

export interface Filters {
  searchBy: string;
  sortName: string;
  maxPrice: string;
  minLikes: string;
  isFav: string;
  sortDir: string;
}

@Component({
  selector: 'app-public-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  dishes$: Observable<DishView[]> = this.store.select(fromMenu.getDishes);
  logged$: Observable<boolean>;
  orders$: Observable<Order[]>;
  orders: Order[];
  extras: ExtraView[] = [];

  constructor(
    private store: Store<fromApp.State>,
    private menuService: MenuService,
    private sidenav: SidenavService,
    title: Title
  ) {
    title.setTitle('Menu');
  }

  ngOnInit(): void {
    this.orders$ = this.store.select(fromOrder.getAllOrders);
    this.store
      .select(fromOrder.getAllOrders)
      .subscribe((orders) => (this.orders = orders));
    this.logged$ = this.store.pipe(select(fromAuth.getLogged));
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

    this.store.dispatch(fromMenu.loadMenus({ filter: composedFilters }));
  }

  onExtraSelected(info: { dish: DishView; extra: ExtraView }): void {
    const extras: ExtraView[] = info.dish.extras.map((e) => {
      if (e.id === info.extra.id) {
        return {
          ...e,
          selected: info.extra.selected,
        };
      } else {
        return {
          ...e,
        };
      }
    });
    const dish = { ...info.dish, extras };
    this.store.dispatch(fromMenu.updateDishExtras({ dish }));
  }

  findOrder(orderToStore: Order): Order {
    return this.orders.find((order) => {
      const orderIds = {
        dishId: order.details.dish.id,
        extrasIds: order.details.extras.map((e) => e.id),
      };
      const orderToStoreIds = {
        dishId: orderToStore.details.dish.id,
        extrasIds: orderToStore.details.extras.map((e) => e.id),
      };
      return isEqual(orderIds, orderToStoreIds);
    });
  }

  onOrderAdded(order: DishView): void {
    const orderToStore = this.menuService.menuToOrder(order);
    orderToStore.details.extras = orderToStore.details.extras.filter(
      (e) => e.selected === true,
    );
    const orderToUpdate = this.findOrder(orderToStore);
    if (orderToUpdate) {
      const update = {
        order: {
          id: orderToUpdate.id,
          changes: {
            details: {
              ...orderToUpdate.details,
              orderLine: {
                ...orderToUpdate.details.orderLine,
                amount: orderToUpdate.details.orderLine.amount + 1,
              },
            },
          },
        },
      };
      this.store.dispatch(fromOrder.updateOrder(update));
    } else {
      this.store.dispatch(
        fromOrder.addOrder({
          order: { ...orderToStore },
        }),
      );
      this.extras = [];
    }
    this.sidenav.openSideNav();
  }
}
