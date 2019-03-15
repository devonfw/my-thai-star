import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromAuth from 'app/user-area/store/reducers/auth.reducer';
import {getUsers, getUsersToken} from 'app/user-area/store/reducers/auth.reducer';


export interface AuthState {
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  auth: fromAuth.AuthReducer
};

export const getState = createFeatureSelector<AuthState>('auth');

export const selectAuthState = createSelector(
  getState,
  (state: AuthState) => state.auth
);

export const getUsersState = (state: AuthState) => state.auth;

export const getUserState = createSelector(getUsersState, getUsers);
export const getToken = createSelector(getUsersState, getUsersToken);
