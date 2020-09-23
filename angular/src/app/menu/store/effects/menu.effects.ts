import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as fromRoot from '../../../store';
import { MenuService } from '../../services/menu.service';
import * as loadMenusActions from '../actions';

@Injectable()
export class MenuEffects {
  loadDishes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMenusActions.loadMenus),
      map((action) => action.filter),
      mergeMap((filter) =>
        this.menuService.getDishes(filter).pipe(
          map((result) => {
            const content = result.content.map((d) => {
              d.extras.map((e) => {
                e.selected = false;
                return e;
              });
              return d;
            });
            const resultAdapted = { pageable: result.pageable, content };
            return loadMenusActions.loadMenusSuccess(resultAdapted);
          }),
          catchError((error) => of(loadMenusActions.loadMenusFail({ error }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private menuService: MenuService) {}
}
