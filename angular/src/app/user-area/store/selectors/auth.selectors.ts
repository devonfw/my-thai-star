import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers';

export const selectAuthState = createFeatureSelector<fromAuth.AppState>('auth');

export const getToken = createSelector(
  selectAuthState,
  (state) => state.auth.token.token,
);

export const getRole = createSelector(
  selectAuthState,
  (state) => state.auth.user.role,
);

export const getUserName = createSelector(
  selectAuthState,
  (state) => state.auth.user.user,
);

export const getLogged = createSelector(
  selectAuthState,
  (state) => state.auth.user.logged,
);
