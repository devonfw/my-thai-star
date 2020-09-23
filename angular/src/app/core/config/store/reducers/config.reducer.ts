import { Config, config as actualConfig } from '../../config';
import { environment } from '../../../../../environments/environment';
import { createReducer, on, Action } from '@ngrx/store';
import * as configActions from '../actions';

export interface State extends Config {
  loaded: boolean;
  pending: boolean;
  errorMessage?: string;
}

export const initialState: State = {
  loaded: !environment.loadExternalConfig,
  pending: false,
  ...actualConfig,
};

export const configReducer = createReducer(
  initialState,
  on(configActions.loadConfig, (state) => ({
    ...state,
    pending: true,
  })),
  on(configActions.loadConfigSuccess, (state, { config }) => ({
    ...state,
    loaded: true,
    pending: false,
    ...config,
  })),
  on(configActions.loadConfigFail, (state, { error }) => ({
    ...state,
    peding: false,
    errorMessage: error.message,
  })),
);

export function reducer(state: State | undefined, action: Action): State {
  return configReducer(state, action);
}
