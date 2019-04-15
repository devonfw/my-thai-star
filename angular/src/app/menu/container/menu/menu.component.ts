import { FilterFormData } from '../../components/menu-filters/menu-filters.component';
import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { DishView } from 'app/shared/view-models/interfaces';
import { Filter, Pageable } from 'app/shared/backend-models/interfaces';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/reducers';
import { getAllDishes } from '../../store/reducers/menu.reducer';
import { LoadMenuStart } from '../../store/actions/menu.actions';
import {AddOrder, UpdateOrder} from '../../store/actions/order.actions';
import {Order} from '../../models/order.model';
import * as fromOrder from 'app/menu/store/reducers/order.reducer';
import {SidenavService} from '../../../sidenav/services/sidenav.service';

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
  dishes$: Observable<DishView[]> = this.store.select(getAllDishes);
  orders$: Observable<Order[]>;
  orders: Order[];

  constructor(
    private store: Store<AppState>,
    private menuService: MenuService,
    private sidenav: SidenavService,
    private orderStore: Store<fromOrder.State>
  ) {}

  ngOnInit(): void {
    this.orders$ = this.orderStore.select(fromOrder.selectAll);
    this.orderStore.select(fromOrder.selectAll).subscribe(orders => this.orders = orders);
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

    this.store.dispatch(new LoadMenuStart(composedFilters));
  }

  idExist(id: number): any {
    if (this.orders.find(orderId => orderId.order.dish.id === id)) {
      return true;
    }
    return false;
  }

  onOrderAdded(order: any) {
    const orderView = this.menuService.menuToOrder(order);
      if (this.idExist(orderView.dish.id) === false) {
        this.store.dispatch(new AddOrder({
          order: { id: orderView.dish.id, order: orderView }
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
