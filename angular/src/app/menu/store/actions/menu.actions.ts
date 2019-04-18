import { Action } from '@ngrx/store';
import { DishView } from 'app/shared/view-models/interfaces';
import { Pageable, Filter } from 'app/shared/backend-models/interfaces';

export enum MenuActionTypes {
  LoadMenuStart = '[Menu] Load Menu Start',
  LoadMenuSuccess = '[Menu] Load Menu Success',
  LoadMenuFail = '[Menu] Load Menu Fail',
}

export class LoadMenuSuccess implements Action {
  readonly type = MenuActionTypes.LoadMenuSuccess;

  constructor(public payload:  {pageable?: Pageable, content?: DishView[]}) {}
}

export class LoadMenuStart implements Action {
  readonly type = MenuActionTypes.LoadMenuStart;

  constructor(public payload: Filter) {}
}

export class LoadMenuFail implements Action {
  readonly type = MenuActionTypes.LoadMenuFail;

  constructor(public payload: any) {}
}

export type MenuActions = LoadMenuSuccess | LoadMenuStart | LoadMenuFail;
