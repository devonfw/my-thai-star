import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {exhaustMap, map} from 'rxjs/operators';
import {BookTableActions, BookTableActionTypes, BookTableResponse} from '../actions/book-table.actions';
import {BookTableService} from '../../services/book-table.service';
import {Booking} from '../../models/booking.model';

@Injectable()
export class BookTableEffects {
  @Effect()
  bookTable$ = this.actions$.pipe(
    ofType(BookTableActionTypes.BOOK_TABLE),
    map(action => {

      return action.payload.booking;
    }),
    exhaustMap((booking: Booking) => {
      return this.bookTableService.postBooking({booking: booking})
        .pipe(map((res: any) => {
          return new BookTableResponse({bookingTableResponse: res});
          }),
        );
    }));

  constructor(
    private actions$: Actions<BookTableActions>,
    public translate: TranslateService,
    private bookTableService: BookTableService,
  ) {}
}

