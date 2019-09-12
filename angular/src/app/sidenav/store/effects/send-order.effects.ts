import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {exhaustMap, tap, map, catchError} from 'rxjs/operators';
import {SendOrderActions, SendOrderActionTypes, SendOrdersSuccess, SendOrdersFail} from '../actions/send-order.actions';
import {SidenavService} from '../../services/sidenav.service';
import {SnackBarService} from '../../../core/snack-bar/snack-bar.service';
import * as fromApp from 'app/store/reducers';
import {Store} from '@ngrx/store';
import { of } from 'rxjs';
import { ClearOrders } from '../actions/order.actions';

@Injectable()
export class SendOrderEffects {
  @Effect()
  sendOrders$ = this.actions$.pipe(
    ofType(SendOrderActionTypes.SendOrders),
    map(tokenData => tokenData.payload.token),
    exhaustMap((token: any) => {
      return this.sidenavService.sendOrders(token)
      .pipe(
        map((res: any) => { console.log('calling success'); return new SendOrdersSuccess(); } ),
        catchError(error => { console.log('calling fail'); return of(new SendOrdersFail({error: error})); })
      );
    }),
  );

  @Effect()
  sendOrdersSuccess = this.actions$.pipe(
    ofType(SendOrderActionTypes.SendOrdersSuccess),
    map(() => {
      console.log('calling clear');
      this.snackBar.openSnack('Order correctly noted', 4000, 'green');
      return new ClearOrders();
    })
  );

  @Effect({dispatch: false})
  sendOrdersFail = this.actions$.pipe(
    ofType(SendOrderActionTypes.SendOrdersFail),
    map(errorData => errorData.payload.error['error']['message']),
    tap((error) => {
      console.log('fail called');
      this.snackBar.openSnack(error, 4000, 'red');
    })
  );

  constructor(
    private store: Store<fromApp.State>,
    private actions$: Actions<SendOrderActions>,
    private sidenavService: SidenavService,
    private snackBar: SnackBarService,
  ) {}

}
