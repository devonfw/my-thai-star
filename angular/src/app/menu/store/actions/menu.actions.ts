import { props, createAction } from '@ngrx/store';
import { Filter, Pageable } from '../../../shared/backend-models/interfaces';
import { DishView } from '../../../shared/view-models/interfaces';

export const loadMenus = createAction(
  '[Menu] Load Menus',
  props<{ filter: Filter }>(),
);

export const loadMenusSuccess = createAction(
  '[Menu] Load Menus Success',
  props<{ pageable?: Pageable; content?: DishView[] }>(),
);

export const loadMenuFail = createAction(
  '[Menu] Load Menus Fail',
  props<{ error: Error }>(),
);
