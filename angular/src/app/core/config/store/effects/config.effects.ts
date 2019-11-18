import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as fromActions from '../actions/config.actions';

@Injectable()
export class ConfigEffects {
  constructor(private action$: Actions, private httpClient: HttpClient) {}

  effectName$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromActions.loadConfig),
      exhaustMap(() => {
        return this.httpClient.get('/config').pipe(
          map((data: any) => {
            return fromActions.loadConfigSuccess({ config: data });
          }),
          catchError((error) => of(fromActions.loadConfigFail(error))),
        );
      }),
    ),
  );
}
