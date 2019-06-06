import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {
  BookTableActions,
  BookTableActionTypes, BookTableFail,
  BookTableSuccess, InviteFriendsFail, InviteFriendsSuccess,
} from '../actions/book-table.actions';
import {BookTableService} from '../../services/book-table.service';
import {Router} from '@angular/router';
import {Booking} from '../../models/booking.model';
import {of} from 'rxjs';
import {SnackBarService} from '../../../core/snack-bar/snack-bar.service';

@Injectable()
export class BookTableEffects {
  @Effect()
  bookTable$ = this.actions$.pipe(
    ofType(BookTableActionTypes.BOOK_TABLE),
    map(action => action.payload),
    exhaustMap((booking: Booking) => this.bookTableService.postBooking(booking)),
    map((res: any) => new BookTableSuccess({
      bookingResponse: {
        name: res.name,
        bookingDate: res.bookingDate,
        bookingToken: res.bookingToken,
        tableId: res.tableId,
        email: res.email
      }
    })),
    catchError(error => of(new BookTableFail({
      errorMessage: error
    })))
  );

  @Effect({dispatch: false})
  bookTableSuccess$ = this.actions$.pipe(
    ofType(BookTableActionTypes.BOOK_TABLE_SUCCESS),
    tap(() => {
      this.translateService.get('bookTable.dialog.bookingSuccess').subscribe( (text: string) => {
        this.snackBar.openSnack(text, 4000, 'green');
      });
      this.router.navigateByUrl('/menu');
    })
  );

  @Effect({dispatch: false})
  bookTableFail$ = this.actions$.pipe(
    ofType(BookTableActionTypes.BOOK_TABLE_FAIL),
    tap(() => {
      this.translateService.get('bookTable.dialog.bookingError').subscribe((text: string) => {
        this.snackBar.openSnack(text, 4000, 'red');
      });
    })
  );

  @Effect()
  inviteFriends$ = this.actions$.pipe(
    ofType(BookTableActionTypes.INVITE_FRIENDS),
    map(action => action.payload),
    exhaustMap((booking: Booking) => this.bookTableService.postBooking(booking)),
    map((res: any) => new InviteFriendsSuccess(res)),
    catchError(error => of(new InviteFriendsFail({
      errorMessage: error
    })))
  );

  @Effect({dispatch: false})
  inviteFriendsSuccess$ = this.actions$.pipe(
    ofType(BookTableActionTypes.INVITE_FRIENDS_SUCCESS),
    tap(() => {
      this.translateService.get('bookTable.dialog.bookingSuccess')
        .subscribe((text: string) => {
          this.snackBar.openSnack(text, 4000, 'green');
        });
      this.router.navigateByUrl('/bookTable');
    })
  );

  @Effect({dispatch: false})
  inviteFriendsFail$ = this.actions$.pipe(
    ofType(BookTableActionTypes.INVITE_FRIENDS_FAIL),
    tap(() => {
      this.translateService.get('bookTable.dialog.bookingError').subscribe((text: string) => {
        this.snackBar.openSnack(text, 4000, 'red');
      });
    })
  );

  constructor(
    private actions$: Actions<BookTableActions>,
    public translateService: TranslateService,
    private bookTableService: BookTableService,
    public snackBar: SnackBarService,
    private router: Router,
  ) {}
}
