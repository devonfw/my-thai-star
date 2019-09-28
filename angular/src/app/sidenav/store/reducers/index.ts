import { EntityState } from '@ngrx/entity';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { Order } from '../../models/order.model';
import { OrderSend } from '../../models/order-send.model';
import * as fromOrder from './order.reducer';
import * as fromOrderSend from './send-order.reducer';

export interface SideNavState extends EntityState<Order | OrderSend> {
  order: fromOrder.OrderState;
  orderSend: fromOrderSend.SendOrderState;
}

export const reducers: ActionReducerMap<Partial<SideNavState>> = {
  order: fromOrder.reducer,
  orderSend: fromOrderSend.reducer,
};

export const getSideNavState = createFeatureSelector<SideNavState>('sidenav');
