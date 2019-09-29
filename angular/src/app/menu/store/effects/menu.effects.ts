import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as loadMenusActions from '../actions/menu.actions';
import {MenuService} from '../../services/menu.service';

@Injectable()
export class MenuEffects {
  loadDishes$ = createEffect(() => this.actions$.pipe(
    ofType(loadMenusActions.loadMenus),
    map(action => action.filter),
    mergeMap(filter => this.menuService.getDishes(filter).pipe(
      map(result => loadMenusActions.loadMenusSuccess(result)),
      catchError(error => of(loadMenusActions.loadMenuFail({error: error})))
    ))
  ));

  constructor (
    private actions$: Actions,
    private menuService: MenuService
  ) {}
}
