import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>('auth');

export const getToken = createSelector(
  selectAuthState,
  state => state.token.token
);

export const getRole = createSelector(
  selectAuthState,
  state => state.user.role
);

export const getLogged = createSelector(
  selectAuthState,
  state => state.user.logged
);
