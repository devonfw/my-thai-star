import { createAction, props, union } from '@ngrx/store';
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

export const loadMenusFail = createAction(
  '[Menu] Load Menus Fail',
  props<{ error: Error }>(),
);

export const updateDishExtras = createAction(
  '[Menu] Select Dish Extras',
  props<{ dish: DishView }>(),
);

// action types
const all = union({
  loadMenus,
  loadMenusSuccess,
  loadMenusFail,
  updateDishExtras,
});
export type MenuActions = typeof all;
