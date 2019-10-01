import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMenu from '../reducers';

export const selectMenuState = createFeatureSelector<fromMenu.AppState>('menu');

export const getDishes = createSelector(
  selectMenuState,
  (state) => state.menu.dishes,
);

export const getLoading = createSelector(
  selectMenuState,
  (state) => state.menu.loading,
);

export const getLoaded = createSelector(
  selectMenuState,
  (state) => state.menu.loaded,
);
