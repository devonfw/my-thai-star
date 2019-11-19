import { createAction, union, props } from '@ngrx/store';
import { Config } from '../../config';

export const loadConfig = createAction('[Config] Load config');

export const loadConfigSuccess = createAction(
  '[Config] Load config success',
  props<{ config: Config }>(),
);

export const loadConfigFail = createAction(
  '[Config] Load config fail',
  props<{ error: Error }>(),
);

// action types
const all = union({
  loadConfig,
  loadConfigSuccess,
  loadConfigFail,
});
export type ConfigActions = typeof all;
