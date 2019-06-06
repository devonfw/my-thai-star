import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MenuActionTypes, MenuActions, LoadMenuFail, LoadMenusSuccess} from '../actions/menu.actions';
import {MenuService} from '../../services/menu.service';


@Injectable()
export class MenuEffects {
  @Effect()
  loadDishes$ = this.actions$.pipe(
    ofType(MenuActionTypes.LOAD_MENUS),
    mergeMap(action => this.menuService.getDishes(action.payload).pipe(
      map(
        result => new LoadMenusSuccess(result),
        catchError(error => of(new LoadMenuFail({
          errorMessage: error
        })))
      )
    ))
  );

  constructor (
    private actions$: Actions<MenuActions>,
    private menuService: MenuService
  ) {}
}
