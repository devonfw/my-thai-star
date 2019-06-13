import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Order } from '../../models/order.model';

export enum OrderActionTypes {
  LoadOrders = '[Order] Load Orders',
  AddOrder = '[Order] Add Order',
  AddOrders = '[Order] Add Orders',
  UpdateOrder = '[Order] Update Order',
  UpdateOrders = '[Order] Update Orders',
  DeleteOrder = '[Order] Delete Order',
  DeleteOrders = '[Order] Delete Orders',
  ClearOrders = '[Order] Clear Orders',
}

export class LoadOrders implements Action {
  readonly type = OrderActionTypes.LoadOrders;

  constructor(public payload: { orders: Order[] }) {}
}

export class AddOrder implements Action {
  readonly type = OrderActionTypes.AddOrder;

  constructor(public payload: { order: Order }) {}
}

export class AddOrders implements Action {
  readonly type = OrderActionTypes.AddOrders;

  constructor(public payload: { orders: Order[] }) {}
}

export class UpdateOrder implements Action {
  readonly type = OrderActionTypes.UpdateOrder;

  constructor(public payload: { order: Update<Order> }) {}
}

export class UpdateOrders implements Action {
  readonly type = OrderActionTypes.UpdateOrders;

  constructor(public payload: { orders: Update<Order>[] }) {}
}

export class DeleteOrder implements Action {
  readonly type = OrderActionTypes.DeleteOrder;

  constructor(public payload: { id: number }) {}
}

export class DeleteOrders implements Action {
  readonly type = OrderActionTypes.DeleteOrders;

  constructor(public payload: { ids: number[] }) {}
}

export class ClearOrders implements Action {
  readonly type = OrderActionTypes.ClearOrders;
}

export type OrderActions =
 LoadOrders
 | AddOrder
 | AddOrders
 | UpdateOrder
 | UpdateOrders
 | DeleteOrder
 | DeleteOrders
 | ClearOrders;
