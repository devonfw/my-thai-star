import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { OrderMenuActionTypes, OrderMenuActions } from '../actions/order-menu.actions';


@Injectable()
export class OrderMenuEffects {


  @Effect()
  loadOrderMenus$ = this.actions$.pipe(
    ofType(OrderMenuActionTypes.LoadOrderMenus),
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<OrderMenuActions>) {}

}
