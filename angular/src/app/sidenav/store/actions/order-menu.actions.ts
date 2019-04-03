import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { OrderMenu } from '../../model/order-menu.model';

export enum OrderMenuActionTypes {
  LoadOrderMenus = '[OrderMenu] Load OrderMenus',
  AddOrderMenu = '[OrderMenu] Add OrderMenu',
  UpsertOrderMenu = '[OrderMenu] Upsert OrderMenu',
  AddOrderMenus = '[OrderMenu] Add OrderMenus',
  UpsertOrderMenus = '[OrderMenu] Upsert OrderMenus',
  UpdateOrderMenu = '[OrderMenu] Update OrderMenu',
  UpdateOrderMenus = '[OrderMenu] Update OrderMenus',
  DeleteOrderMenu = '[OrderMenu] Delete OrderMenu',
  DeleteOrderMenus = '[OrderMenu] Delete OrderMenus',
  ClearOrderMenus = '[OrderMenu] Clear OrderMenus'
}

export class LoadOrderMenus implements Action {
  readonly type = OrderMenuActionTypes.LoadOrderMenus;

  constructor(public payload: { orderMenus: OrderMenu[] }) {}
}

export class AddOrderMenu implements Action {
  readonly type = OrderMenuActionTypes.AddOrderMenu;

  constructor(public payload: { orderMenu: OrderMenu }) {}
}

export class UpsertOrderMenu implements Action {
  readonly type = OrderMenuActionTypes.UpsertOrderMenu;

  constructor(public payload: { orderMenu: OrderMenu }) {}
}

export class AddOrderMenus implements Action {
  readonly type = OrderMenuActionTypes.AddOrderMenus;

  constructor(public payload: { orderMenus: OrderMenu[] }) {}
}

export class UpsertOrderMenus implements Action {
  readonly type = OrderMenuActionTypes.UpsertOrderMenus;

  constructor(public payload: { orderMenus: OrderMenu[] }) {}
}

export class UpdateOrderMenu implements Action {
  readonly type = OrderMenuActionTypes.UpdateOrderMenu;

  constructor(public payload: { orderMenu: Update<OrderMenu> }) {}
}

export class UpdateOrderMenus implements Action {
  readonly type = OrderMenuActionTypes.UpdateOrderMenus;

  constructor(public payload: { orderMenus: Update<OrderMenu>[] }) {}
}

export class DeleteOrderMenu implements Action {
  readonly type = OrderMenuActionTypes.DeleteOrderMenu;

  constructor(public payload: { id: string }) {}
}

export class DeleteOrderMenus implements Action {
  readonly type = OrderMenuActionTypes.DeleteOrderMenus;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearOrderMenus implements Action {
  readonly type = OrderMenuActionTypes.ClearOrderMenus;
}

export type OrderMenuActions =
 LoadOrderMenus
 | AddOrderMenu
 | UpsertOrderMenu
 | AddOrderMenus
 | UpsertOrderMenus
 | UpdateOrderMenu
 | UpdateOrderMenus
 | DeleteOrderMenu
 | DeleteOrderMenus
 | ClearOrderMenus;
