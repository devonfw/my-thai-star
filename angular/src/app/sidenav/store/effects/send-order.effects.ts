import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {exhaustMap, tap} from 'rxjs/operators';
import {SendOrderActions, SendOrderActionTypes} from '../actions/send-order.actions';
import {SidenavService} from '../../services/sidenav.service';
import {SnackBarService} from '../../../core/snack-bar/snack-bar.service';
import * as fromApp from 'app/store/reducers';
import {Store} from '@ngrx/store';

@Injectable()
export class SendOrderEffects {
  @Effect()
  sendOrders$ = this.actions$.pipe(
    ofType(SendOrderActionTypes.SendOrders),
    exhaustMap((token: any) => {
      return this.sidenavService.sendOrders(token);
    }),
  );

  @Effect({dispatch: false})
  sendOrdersSuccess = this.actions$.pipe(
    ofType(SendOrderActionTypes.SendOrdersSuccess),
    tap(() => {
      this.snackBar.openSnack('Order correctly noted', 4000, 'green');
    })
  );

  @Effect({dispatch: false})
  sendOrdersFail = this.actions$.pipe(
    ofType(SendOrderActionTypes.SendOrdersFail),
    tap(() => {
      this.snackBar.openSnack('Error sending order, please, try again later', 4000, 'red');
    })
  );

  constructor(
    private store: Store<fromApp.State>,
    private actions$: Actions<SendOrderActions>,
    private sidenavService: SidenavService,
    private snackBar: SnackBarService,
  ) {}

}
