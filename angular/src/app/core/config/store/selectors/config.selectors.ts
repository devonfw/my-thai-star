import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromConfig from '../reducers';

export const selectConfigState = createFeatureSelector<fromConfig.ConfigState>(
  'config',
);

export const getConfig = createSelector(
  selectConfigState,
  (state) => state.config,
);

export const getConfigVersion = createSelector(
  selectConfigState,
  (state) => state.config.version,
);

export const getRestServiceRoot = createSelector(
  selectConfigState,
  (state) => state.config.restServiceRoot,
);
