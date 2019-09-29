import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import {
  catchError,
  exhaustMap,
  map,
  switchMap,
  tap,
  mergeMap,
} from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import 'rxjs/add/observable/from';
import * as authActions from '../actions/auth.actions';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginDialogComponent } from '../../components/login-dialog/login-dialog.component';
import { TwoFactorDialogComponent } from 'app/user-area/components/two-factor-dialog/two-factor-dialog.component';
import { WindowService } from '../../../core/window/window.service';
import { UserAreaService } from '../../services/user-area.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../core/config/config.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromAuth from '../reducers';

@Injectable()
export class AuthEffects {
  private readonly restPathRoot: string;
  private readonly verifyRestPath: string = 'verify';
  private readonly restServiceRoot: string;
  private readonly currentUserRestPath: string = 'security/v1/currentuser/';
  authAlerts: any;

  // Open Login Dialog and dispatch Login
  openDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.openDialog),
      exhaustMap(() => {
        const dialogRef: MatDialogRef<LoginDialogComponent> = this.dialog.open(
          LoginDialogComponent,
          {
            width: this.window.responsiveWidth(),
          },
        );
        return dialogRef.afterClosed();
      }),
      map((result: any) => {
        if (result === undefined) {
          return authActions.closeDialog();
        }
        return authActions.login({
          username: result.username,
          password: result.password,
        });
      }),
    ),
  );

  // Close Login Dialog
  closeDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.closeDialog),
        map(() => {
          const dialogRef = this.dialog.open(LoginDialogComponent);
          return dialogRef.close();
        }),
      ),
    { dispatch: false },
  );

  // Communicate with Server (this.userService.login),
  // check whether user has opted for two-factor authentication,
  // if yes then dispatch VerifyTwoFactor with user details
  // else dispatch Token to get the payload username and role
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      exhaustMap((user: any) => {
        return this.userService.login(user.username, user.password).pipe(
          map((res) => {
            if (res.headers.get('X-Mythaistar-Otp') === 'NONE') {
              return authActions.token({
                token: { token: res.headers.get('Authorization') },
              });
            } else if (res.headers.get('X-Mythaistar-Otp') === 'OTP') {
              return authActions.verifyTwoFactor({
                username: user.username,
                password: user.password,
              });
            }
          }),
          catchError((error) => of(authActions.loginFail({ error: error }))),
        );
      }),
    ),
  );

  // Open two-factor dialog for OTP,
  // verify user with payload user details and OTP
  // dispatch Token to get the payload username and role
  verifyTwoFactor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.verifyTwoFactor),
      mergeMap((user) => {
        const dialogRef: MatDialogRef<
          TwoFactorDialogComponent
        > = this.dialog.open(TwoFactorDialogComponent, {
          width: this.window.responsiveWidth(),
        });
        return dialogRef.afterClosed().pipe(
          map((result) => {
            return this.http.post(
              `${this.restPathRoot}${this.verifyRestPath}`,
              {
                username: user.username,
                password: user.password,
                token: result.token,
              },
              { responseType: 'text', observe: 'response' },
            );
          }),
        );
      }),
      switchMap((token) => {
        return token.pipe(
          map((res) => {
            return authActions.token({
              token: { token: res.headers.get('Authorization') },
            });
          }),
          catchError((error) => of(authActions.loginFail({ error: error }))),
        );
      }),
    ),
  );

  // make an http call to get the payload username and role
  token$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.token),
      exhaustMap((token) => {
        return this.http
          .get(`${this.restServiceRoot}${this.currentUserRestPath}`)
          .pipe(
            map((loginInfo: any) => {
              return authActions.loginSuccess({
                user: {
                  user: loginInfo.name,
                  role: loginInfo.role,
                  logged: true,
                },
              });
            }),
          );
      }),
    ),
  );

  // navigate on successfull login
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        map((user) => user.user.role),
        exhaustMap((role: string) => {
          this.translate
            .get('alerts.authAlerts.loginSuccess')
            .subscribe((text: string) => {
              this.snackBar.openSnack(text, 4000, 'green');
            });
          if (role === 'CUSTOMER') {
            return this.router.navigate(['restaurant']);
          } else if (role === 'WAITER') {
            return this.router.navigate(['orders']);
          } else if (role === 'MANAGER') {
            return this.router.navigate(['prediction']);
          }
        }),
      ),
    { dispatch: false },
  );

  // Close Login Dialog
  loginFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginFail),
        map((errorData) => errorData.error),
        tap((error) => {
          this.snackBar.openSnack(error.message, 4000, 'red');
        }),
      ),
    { dispatch: false },
  );

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        this.router.navigateByUrl('/restaurant');
        this.translate
          .get('alerts.authAlerts.logoutSuccess')
          .subscribe((text: string) => {
            this.snackBar.openSnack(text, 4000, 'black');
          });
      }),
      catchError((error) => of(authActions.logoutFail({ error: error }))),
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    public window: WindowService,
    public userService: UserAreaService,
    public translate: TranslateService,
    private router: Router,
    public snackBar: SnackBarService,
    private configService: ConfigService,
    private http: HttpClient,
    private store: Store<fromAuth.AppState>,
  ) {
    this.restPathRoot = this.configService.getValues().restPathRoot;
    this.restServiceRoot = this.configService.getValues().restServiceRoot;
    this.translate.get('alerts.authAlerts').subscribe((content: any) => {
      this.authAlerts = content;
    });
  }
}
