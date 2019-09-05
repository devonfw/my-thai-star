import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromMenu from '../reducers/menu.reducer';

export const selectMenuState = createFeatureSelector<fromMenu.MenuState>('menu');

export const getDishes = createSelector(
  selectMenuState,
  state => state.dishes
);

export const getLoading = createSelector(
  selectMenuState,
  state => state.loading
);

export const getLoaded = createSelector(
  selectMenuState,
  state => state.loaded
);
