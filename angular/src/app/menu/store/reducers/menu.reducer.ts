import { createReducer, on, Action } from '@ngrx/store';
import * as loadMenusActions from '../actions/menu.actions';
import { DishView } from '../../../shared/view-models/interfaces';

export interface MenuState {
  loading: boolean;
  loaded: boolean;
  dishes: DishView[];
  errorMessage: string;
}

export const initialState: MenuState = {
  loading: false,
  loaded: false,
  dishes: [],
  errorMessage: '',
};

const loadMenusReducer = createReducer(
  initialState,
  on(loadMenusActions.loadMenus, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    dishes: [],
  })),
  on(loadMenusActions.loadMenusSuccess, (state, { content }) => ({
    ...state,
    loading: false,
    loaded: true,
    dishes: content,
  })),
  on(loadMenusActions.loadMenusFail, (state, { error }) => ({
    ...state,
    errorMessage: error.message,
  })),
  on(loadMenusActions.updateDishExtras, (state, { dish }) => {
    // TODO: Fix
    const dishToUpdate: DishView = {
      ...state.dishes.find((d) => d.dish.id === dish.dish.id),
    };
    dishToUpdate.extras = dish.extras;
    const stateCopy = { ...state };
    const dishes = [
      ...stateCopy.dishes.map((d) =>
        d.dish.id === dish.dish.id ? dishToUpdate : d,
      ),
    ];
    return {
      ...stateCopy,
      dishes,
    };
  }),
);

export function reducer(
  state: MenuState | undefined,
  action: Action,
): MenuState {
  return loadMenusReducer(state, action);
}
