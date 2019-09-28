import { NavigationExtras } from '@angular/router';
import { createAction, props, union } from '@ngrx/store';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export const go = createAction(
  GO,
  props<{
    path: any[];
    query?: object;
    extras?: NavigationExtras;
  }>(),
);

export const back = createAction(BACK);
export const forward = createAction(FORWARD);

const all = union({ go, back, forward });
export type Actions = typeof all;
