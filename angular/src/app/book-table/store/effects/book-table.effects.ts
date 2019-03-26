import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthActions, AuthActionTypes, LoginFail, LoginSuccess} from '../../../user-area/store/actions/auth.actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {Credentials} from '../../../user-area/models/user';
import {of} from 'rxjs';
import {BookTableActions, BookTableActionTypes, BookTableSuccess} from '../actions/book-table.actions';
import {BookTableService} from '../../shared/book-table.service';
import {Booking} from '../../models/booking.model';

@Injectable()
export class BookTableEffects {
  @Effect()
  bookTable$ = this.actions$.pipe(
    ofType(BookTableActionTypes.BOOK_TABLE),
    map(action => action.payload.booking),
    exhaustMap((booking: Booking) => {
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', booking);
      return this.bookTableService.postBooking(booking)
        .pipe(map((res: any) => {
            console.log(res);
          }),
        );
    }));

  constructor(
    private actions$: Actions<BookTableActions>,
    public translate: TranslateService,
    private bookTableService: BookTableService,
  ) {}
}

