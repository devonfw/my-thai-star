import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import * as fromRoot from '../../../store';
import { Booking } from '../../models/booking.model';
import { BookTableService } from '../../services/book-table.service';
import * as bookTableActions from '../actions/book-table.actions';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class BookTableEffects {
  bookTable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookTableActions.bookTable),
      map((booking) => booking['booking']),
      exhaustMap((booking: any) => {
        return this.bookTableService.postBooking({ booking: booking }).pipe(
          map((res: any) =>
            bookTableActions.bookTableSuccess({
              bookingResponse: {
                name: res.name,
                bookingDate: res.bookingDate,
                bookingToken: res.bookingToken,
                tableId: res.tableId,
                email: res.email,
              },
            }),
          ),
          catchError((error) =>
            of(bookTableActions.bookTableFail({ error: error })),
          ),
        );
      }),
    ),
  );

  bookTableSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(bookTableActions.bookTableSuccess),
        tap(() => {
          this.translocoService
            .selectTranslate('bookTable.dialog.bookingSuccess')
            .subscribe((text: string) => {
              this.snackBar.openSnack(text, 4000, 'green');
            });
          fromRoot.go({ path: ['/menu'] });
        }),
      ),
    { dispatch: false },
  );

  bookTableFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(bookTableActions.bookTableFail),
        tap(() => {
          this.translocoService
            .selectTranslate('bookTable.dialog.bookingError')
            .subscribe((text: string) => {
              this.snackBar.openSnack(text, 4000, 'red');
            });
        }),
      ),
    { dispatch: false },
  );

  inviteFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookTableActions.inviteFriends),
      map((booking) => booking['booking']),
      exhaustMap((booking: Booking) =>
        this.bookTableService.postBooking(booking).pipe(
          map((res: any) => bookTableActions.inviteFriendsSuccess(res)),
          catchError((error) =>
            of(
              bookTableActions.inviteFriendsFail({
                error: error,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  inviteFriendsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(bookTableActions.inviteFriendsSuccess),
        tap(() => {
          this.translocoService
            .selectTranslate('bookTable.dialog.bookingSuccess')
            .subscribe((text: string) => {
              this.snackBar.openSnack(text, 4000, 'green');
            });
          fromRoot.go({ path: ['/bookTable'] });
        }),
      ),
    { dispatch: false },
  );

  inviteFriendsFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(bookTableActions.inviteFriendsFail),
        tap(() => {
          this.translocoService
            .selectTranslate('bookTable.dialog.bookingError')
            .subscribe((text: string) => {
              this.snackBar.openSnack(text, 4000, 'red');
            });
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    public translocoService: TranslocoService,
    private bookTableService: BookTableService,
    public snackBar: SnackBarService,
  ) {}
}
