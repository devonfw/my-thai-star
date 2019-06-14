import {
  ActionReducerMap,
} from '@ngrx/store';
import * as fromMenu from './menu.reducer';

export interface AppState {
  menu: fromMenu.MenuState;
}

export const reducers: ActionReducerMap<AppState> = {
  menu: fromMenu.reducer,
};
