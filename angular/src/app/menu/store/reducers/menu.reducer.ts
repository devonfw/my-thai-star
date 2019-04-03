import { Action, createSelector, createFeatureSelector } from '@ngrx/store';
import { Pageable } from '../../../shared/backend-models/interfaces';
import { DishView } from 'app/shared/view-models/interfaces';
import { MenuActionTypes, MenuActions } from '../actions/menu.actions';
import { AppState } from 'app/store/reducers';

export interface MenuState {
  loading: boolean;
  loaded: boolean;
  dishes: DishView[];
}

export const initialState: MenuState = {
  loading: false,
  loaded: false,
  dishes: [],
};

export function MenuReducer(state = initialState, action: MenuActions): MenuState {

  switch (action.type) {
    case MenuActionTypes.LoadMenuSuccess: {
      return {
        ...state,
        loading: false,
        loaded: true,
        dishes: action.payload.content
      };
    }

    case MenuActionTypes.LoadMenuStart: {
      return {
        ...state,
        loading: true,
        loaded: false,
        dishes: []
      };
    }

    default:
      return state;
  }
}

const selectMenu = createFeatureSelector<AppState, MenuState>('menu');

export const getAllDishes = createSelector(
  selectMenu,
  state => state.dishes
);

export const isLoading = createSelector(
  selectMenu,
  state => state.loading
);

export const isLoaded = createSelector(
  selectMenu,
  state => state.loaded
);
