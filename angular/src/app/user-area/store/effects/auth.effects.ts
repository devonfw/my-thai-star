import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

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
import {
  AuthActions,
  AuthActionTypes,
  CloseDialog,
  Login,
  LoginFail,
  LoginSuccess,
  LogoutFail,
  Token,
  Logout,
  VerifyTwoFactor,
} from '../actions/auth.actions';
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
  @Effect()
  openDialog$ = this.actions$.pipe(
    ofType(AuthActionTypes.OPEN_DIALOG),
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
        return new CloseDialog();
      }
      return new Login({
        username: result.username,
        password: result.password,
      });
    }),
  );

  // Close Login Dialog
  @Effect({ dispatch: false })
  closeDialog$ = this.actions$.pipe(
    ofType(AuthActionTypes.CLOSE_DIALOG),
    map(() => {
      const dialogRef = this.dialog.open(LoginDialogComponent);
      return dialogRef.close();
    }),
  );

  // Communicate with Server (this.userService.login),
  // check whether user has opted for two-factor authentication,
  // if yes then dispatch VerifyTwoFactor with user details
  // else dispatch Token to get the payload username and role
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((userData) => userData.payload),
    exhaustMap((user: any) => {
      return this.userService.login(user.username, user.password).pipe(
        map((res) => {
          if (res.headers.get('X-Mythaistar-Otp') === 'NONE') {
            return new Token({
              token: { token: res.headers.get('Authorization') },
            });
          } else if (res.headers.get('X-Mythaistar-Otp') === 'OTP') {
            return new VerifyTwoFactor({
              username: user.username,
              password: user.password,
            });
          }
        }),
        catchError((error) => of(new LoginFail({ error: error }))),
      );
    }),
  );

  // Open two-factor dialog for OTP,
  // verify user with payload user details and OTP
  // dispatch Token to get the payload username and role
  @Effect()
  verifyTwoFactor$ = this.actions$.pipe(
    ofType(AuthActionTypes.VERIFY_TWO_FACTOR),
    map((userData) => userData.payload),
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
          return new Token({
            token: { token: res.headers.get('Authorization') },
          });
        }),
        catchError((error) => of(new LoginFail({ error: error }))),
      );
    }),
  );

  // make an http call to get the payload username and role
  @Effect()
  token$ = this.actions$.pipe(
    ofType(AuthActionTypes.TOKEN),
    exhaustMap((token) => {
      return this.http
        .get(`${this.restServiceRoot}${this.currentUserRestPath}`)
        .pipe(
          map((loginInfo: any) => {
            return new LoginSuccess({
              user: {
                user: loginInfo.name,
                role: loginInfo.role,
                logged: true,
              },
            });
          }),
        );
    }),
  );

  // navigate on successfull login
  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    map((user) => user.payload.user.role),
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
  );

  // Close Login Dialog
  @Effect({ dispatch: false })
  loginFail$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAIL),
    map((errorData) => errorData.payload.error),
    tap((error) => {
      this.snackBar.openSnack(error.message, 4000, 'red');
    }),
  );

  @Effect({ dispatch: false })
  logOut$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      this.router.navigateByUrl('/restaurant');
      this.translate
        .get('alerts.authAlerts.logoutSuccess')
        .subscribe((text: string) => {
          this.snackBar.openSnack(text, 4000, 'black');
        });
    }),
    catchError((error) => of(new LogoutFail({ error: error }))),
  );

  constructor(
    private actions$: Actions<AuthActions>,
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
