import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from 'app/user-area/store/reducers/auth.reducer';

export interface AppState {
  router: fromRouter.RouterReducerState;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  auth: fromAuth.reducer,
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger, storeFreeze] : [];
