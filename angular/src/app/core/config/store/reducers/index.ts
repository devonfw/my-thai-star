import * as fromConfig from '../reducers/config.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface ConfigState {
  config: fromConfig.State;
}

export const reducers: ActionReducerMap<ConfigState> = {
  config: fromConfig.reducer,
};
