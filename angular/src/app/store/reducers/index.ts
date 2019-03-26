import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from 'app/user-area/store/reducers/auth.reducer';
import * as fromBookTable from 'app/book-table/store/reducers/book-table.reducer';
import * as fromMenu from 'app/menu/store/reducers/menu.reducer';

export interface AppState {
  router: fromRouter.RouterReducerState;
  auth: fromAuth.State;
  bookTable: fromBookTable.State;
  menu: fromMenu.MenuState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  auth: fromAuth.reducer,
  bookTable: fromBookTable.reducer,
  menu: fromMenu.MenuReducer
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
