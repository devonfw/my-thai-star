import { Injectable } from '@angular/core';
import {Actions, Effect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {AuthActions, AuthActionTypes} from '../../user-area/store/actions/auth.actions';
import {filter, map, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs';

@Injectable()
export class AppEffects {
  @Effect({ dispatch: false })
  storeActions$ = this.actions$.pipe(
    // intercepts actions for adding, checking off, or removing items
    ofType(
      AuthActionTypes.LOGIN_SUCCESS,
      AuthActionTypes.LOGOUT
    ),
    tap(action => {
      const storedActions = window.localStorage.getItem('LocalStorageState');
      window.localStorage.setItem(
        'LocalStorageState',
        JSON.stringify(action)
      );
    }),
  );


  constructor(private actions$: Actions<AuthActions>) {}
}
