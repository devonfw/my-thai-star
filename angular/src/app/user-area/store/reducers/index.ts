import * as AuthDataState from './auth.reducer';
import {createFeatureSelector, ActionReducerMap, createSelector} from '@ngrx/store';
import {getUserData} from './auth.reducer';

export * from '../effects';

export interface Authentication {
  authData: AuthDataState.State;
}
export const reducers: ActionReducerMap<Authentication> = {
  authData: AuthDataState.reducer,
};
export const getAuthState: any = createFeatureSelector<Authentication>(
  'authdatareducer',
);

export const selectAuthStatusState: any = createSelector(
  getAuthState,
  (state: Authentication) => state.authData,
);

export const getUser = createSelector(selectAuthStatusState, getUserData);
export const getLoggedIn = createSelector(getUser, user => !!user);
