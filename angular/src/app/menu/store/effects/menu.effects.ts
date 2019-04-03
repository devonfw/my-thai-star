import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MenuService } from 'app/menu/services/menu.service';
import { MenuActionTypes, MenuActions, LoadMenuSuccess } from '../actions/menu.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class MenuEffects {

  constructor(
    private actions$: Actions<MenuActions>,
    private menuService: MenuService,
    ) {}

    @Effect()
    loadDishes$ = this.actions$.pipe(
      ofType(MenuActionTypes.LoadMenuStart),
      mergeMap(action => this.menuService.getDishes(action.payload).pipe(
        map(
          result => new LoadMenuSuccess(result),
          catchError(error => EMPTY)
          )
      ))
    );
}
