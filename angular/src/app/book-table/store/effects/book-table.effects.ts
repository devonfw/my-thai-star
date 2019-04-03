import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {
  BookTableActions,
  BookTableActionTypes, BookTableFail,
  BookTableSuccess, InviteFriendsFail, InviteFriendsSuccess,
} from '../actions/book-table.actions';
import {BookTableService} from '../../services/book-table.service';
import {Router} from '@angular/router';
import {Booking} from '../../models/booking';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material';
import {BookTableDialogComponent} from '../../components/book-table-dialog/book-table-dialog.component';
import {WindowService} from '../../../core/window/window.service';
import {InvitationDialogComponent} from '../../components/invitation-dialog/invitation-dialog.component';

@Injectable()
export class BookTableEffects {
  @Effect()
  bookTable$ = this.actions$.pipe(
    ofType(BookTableActionTypes.BOOK_TABLE),
    map(action => action.payload),
    exhaustMap((booking: Booking) => this.dialog.open(BookTableDialogComponent, {
      width: this.window.responsiveWidth(),
      data: booking.booking,
    }).afterClosed()
      .pipe(
        switchMap(() =>  this.bookTableService.postBooking(booking)),
        map((res: any) => new BookTableSuccess({bookingResponse: {name: res.name, bookingDate: res.bookingDate,
            bookingToken: res.bookingToken, tableId: res.tableId, email: res.email}})),
        catchError(error => of(new BookTableFail({error: error})))
      )));

  @Effect({dispatch: false})
  bookTableSuccess$ = this.actions$.pipe(
    ofType(BookTableActionTypes.BOOK_TABLE_SUCCESS),
    tap(() => {
      this.router.navigateByUrl('/menu');
    })
  );

  @Effect()
  inviteFriends$ = this.actions$.pipe(
    ofType(BookTableActionTypes.INVITE_FRIENDS),
    map(action => action.payload),
    exhaustMap((booking: Booking) => this.dialog.open(InvitationDialogComponent, {
      width: this.window.responsiveWidth(),
      data: booking.booking,
    }).afterClosed()
      .pipe(
        switchMap(() =>  this.bookTableService.postBooking(booking)),
        map((res: any) => new InviteFriendsSuccess(res)),
        catchError(error => of(new InviteFriendsFail({error: error})))
      )));

  @Effect({dispatch: false})
  inviteFriendsSuccess$ = this.actions$.pipe(
    ofType(BookTableActionTypes.INVITE_FRIENDS_SUCCESS),
    tap(() => {
      this.router.navigateByUrl('/');
    })
  );

  constructor(
    private actions$: Actions<BookTableActions>,
    public translate: TranslateService,
    private bookTableService: BookTableService,
    private router: Router,
    private dialog: MatDialog,
    private window: WindowService,
  ) {}
}
