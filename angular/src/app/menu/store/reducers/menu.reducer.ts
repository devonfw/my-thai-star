import { createReducer, on, Action } from '@ngrx/store';
import * as loadMenusActions from '../actions/menu.actions';
import {DishView} from '../../../shared/view-models/interfaces';

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
  on(loadMenusActions.loadMenus, state => ({...state, loading: true, loaded: false, dishes: [] })),
  on(loadMenusActions.loadMenusSuccess, (state, {content}) => ({...state, loading: false, loaded: true, dishes: content})),
  on(loadMenusActions.loadMenuFail, (state, {error}) => ({...state, errorMessage: error.message}))
);

export function reducer(state: MenuState | undefined, action: Action) {
  return loadMenusReducer(state, action);
}
