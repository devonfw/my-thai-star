import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { BookTableActionTypes, BookTableActions } from '../actions/book-table.actions';


@Injectable()
export class BookTableEffects {


  @Effect()
  loadBookTables$ = this.actions$.pipe(
    ofType(BookTableActionTypes.LoadBookTables),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<BookTableActions>) {}

}
