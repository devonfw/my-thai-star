import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap, exhaustMap, tap } from 'rxjs/operators';

import * as fromActions from '../actions/config.actions';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigEffects {
  constructor(private action$: Actions, private httpClient: HttpClient) {}

  @Effect()
  effectName$ = this.action$.pipe(
    ofType(fromActions.loadConfig),
    exhaustMap(() => {
      return this.httpClient.get('/config').pipe(
        map((data: any) => {
          return fromActions.loadConfigSuccess({ config: data });
        }),
        catchError((error) => of(fromActions.loadConfigFail(error))),
      );
    }),
  );
}
