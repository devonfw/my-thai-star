import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { exhaustMap, tap, map, catchError } from 'rxjs/operators';
import * as sendOrderActions from '../actions/send-order.actions';
import { SidenavService } from '../../services/sidenav.service';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import * as fromApp from 'app/store/reducers';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as orderActions from '../actions/order.actions';

@Injectable()
export class SendOrderEffects {
  sendOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendOrderActions.sendOrders),
      map(tokenData => tokenData.token),
      exhaustMap((token: any) => {
        return this.sidenavService.sendOrders(token).pipe(
          map((res: any) => {
            return sendOrderActions.sendOrdersSuccess();
          }),
          catchError((error) => {
            return of(sendOrderActions.sendOrdersFail({ error: error }));
          }),
        );
      }),
    ),
  );

  sendOrdersSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(sendOrderActions.sendOrdersSuccess),
      map(() => {
        this.snackBar.openSnack('Order correctly noted', 4000, 'green');
        return orderActions.clearOrders();
      }),
    ),
  );

  sendOrdersFail = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendOrderActions.sendOrdersFail),
        map((errorData) => errorData['error']['message']),
        tap((error) => {
          this.snackBar.openSnack(error, 4000, 'red');
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private store: Store<fromApp.State>,
    private actions$: Actions,
    private sidenavService: SidenavService,
    private snackBar: SnackBarService,
  ) {}
}
