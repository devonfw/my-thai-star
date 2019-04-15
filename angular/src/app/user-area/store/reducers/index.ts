import * as AuthDataState from './auth.reducer';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export * from '../effects';

/* @export
 * @interface Authentication
 */
export interface Authentication {
  authData: AuthDataState.State;
}
export const reducers: ActionReducerMap<Authentication> = {
  authData: AuthDataState.reducer,
};
export const getAuthState: any = createFeatureSelector<Authentication>(
  'authdatareducer',
);
