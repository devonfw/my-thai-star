import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as RouterActions from '../actions/router.action';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
  ) {}

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.go),
        tap(({ path, query: queryParams, extras }) => {
          this.router.navigate(path, { queryParams, ...extras });
        }),
      ),
    { dispatch: false },
  );

  navigateBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.back),
        tap(() => {
          this.location.back();
        }),
      ),
    { dispatch: false },
  );

  navigateForward$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.forward),
        tap(() => {
          this.location.forward();
        }),
      ),
    { dispatch: false },
  );
}
