import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SaveOrderResponse } from 'app/shared/view-models/interfaces';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import { SidenavService } from '../../services/sidenav.service';
import * as orderActions from '../actions/order.actions';
import * as sendOrderActions from '../actions/send-order.actions';

@Injectable()
export class SendOrderEffects {
  sendOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendOrderActions.sendOrders),
      map((tokenData) => tokenData.token),
      exhaustMap((token: string) => {
        return this.sidenavService.sendOrders(token).pipe(
          map((res: SaveOrderResponse) => {
            return sendOrderActions.sendOrdersSuccess();
          }),
          catchError((error) => {
            return of(sendOrderActions.sendOrdersFail({ error }));
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
        map((errorData) => errorData.error),
        tap((error) => {
          this.snackBar.openSnack(error, 4000, 'red');
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private sidenavService: SidenavService,
    private snackBar: SnackBarService,
  ) {}
}
