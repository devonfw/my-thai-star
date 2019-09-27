import { props, createAction, union } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Order } from '../../models/order.model';

export const loadOrders = createAction(
  '[Order] Load Orders',
  props<{ orders: Order[] }>(),
);

export const addOrder = createAction(
  '[Order] Add Order',
  props<{ order: Order }>(),
);

export const addOrders = createAction(
  '[Order] Add Orders',
  props<{ orders: Order[] }>(),
);

export const updateOrder = createAction(
  '[Order] Update Order',
  props<{ order: Update<Order> }>(),
);

export const updateOrders = createAction(
  '[Order] Update Orders',
  props<{ orders: Update<Order>[] }>(),
);

export const deleteOrder = createAction(
  '[Order] Delete Order',
  props<{ id: string }>(),
);

export const deleteOrders = createAction(
  '[Order] Delete Orders',
  props<{ ids: string[] }>(),
);

export const clearOrders = createAction('[Order] Clear Orders');

// action types
const all = union({
  loadOrders,
  addOrder,
  addOrders,
  updateOrder,
  updateOrders,
  deleteOrder,
  deleteOrders,
  clearOrders,
});
export type OrdersAction = typeof all;
