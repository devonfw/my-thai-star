import { Action } from '@ngrx/store';
import { DishView } from 'app/shared/view-models/interfaces';
import { Pageable, Filter } from 'app/shared/backend-models/interfaces';

export enum MenuActionTypes {
  LoadMenuSuccess = '[Menu] Load Menu Success',
  LoadMenuStart = '[Menu] Load Menu Start',
}

export class LoadMenuSuccess implements Action {
  readonly type = MenuActionTypes.LoadMenuSuccess;

  constructor(public payload:  {pageable?: Pageable, content?: DishView[]}) {}
}

export class LoadMenuStart implements Action {
  readonly type = MenuActionTypes.LoadMenuStart;

  constructor(public payload: Filter) {}
}

export type MenuActions = LoadMenuSuccess | LoadMenuStart;
