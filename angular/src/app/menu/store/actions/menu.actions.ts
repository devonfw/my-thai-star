import { Action } from '@ngrx/store';
import {Filter, Pageable} from '../../../shared/backend-models/interfaces';
import {DishView} from '../../../shared/view-models/interfaces';

export enum MenuActionTypes {
  LOAD_MENUS = '[Menu] Load Menus',
  LOAD_MENUS_SUCCESS = '[Menu] Load Menus Success',
  LOAD_MENUS_FAIL = '[Menu] Load Menus Fail',
}

export class LoadMenus implements Action {
  readonly type = MenuActionTypes.LOAD_MENUS;

  constructor(public payload: Filter) {}
}

export class LoadMenusSuccess implements Action {
  readonly type = MenuActionTypes.LOAD_MENUS_SUCCESS;

  constructor(public payload:  {pageable?: Pageable, content?: DishView[]}) {}
}

export class LoadMenuFail implements Action {
  readonly type = MenuActionTypes.LOAD_MENUS_FAIL;

  constructor(public payload: any) {}
}

export type MenuActions =
  | LoadMenus
  | LoadMenusSuccess
  | LoadMenuFail;
