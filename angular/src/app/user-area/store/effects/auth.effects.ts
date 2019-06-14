import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import 'rxjs/add/observable/from';
import {
  AuthActions,
  AuthActionTypes,
  CloseDialog,
  Login,
  LoginFail,
  LoginSuccess,
  LogoutFail,
  Token
} from '../actions/auth.actions';
import {MatDialog, MatDialogRef} from '@angular/material';
import {LoginDialogComponent} from '../../components/login-dialog/login-dialog.component';
import {WindowService} from '../../../core/window/window.service';
import {UserAreaService} from '../../services/user-area.service';
import {TranslateService} from '@ngx-translate/core';
import {SnackBarService} from '../../../core/snack-bar/snack-bar.service';
import {Router} from '@angular/router';
import {ConfigService} from '../../../core/config/config.service';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromAuth from '../reducers';

@Injectable()
export class AuthEffects {

  private readonly restPathRoot: string;
  private readonly restServiceRoot: string;
  private readonly loginRestPath: string = 'login';
  private readonly currentUserRestPath: string = 'security/v1/currentuser/';
  private readonly registerRestPath: string = 'register';
  private readonly changePasswordRestPath: string = 'changepassword';
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
      return new Login({username: result.username, password: result.password});
    })
  );

  // Close Login Dialog
  @Effect({dispatch: false})
  closeDialog$ = this.actions$.pipe(
    ofType(AuthActionTypes.CLOSE_DIALOG),
    map(() => {
      const dialogRef = this.dialog.open(LoginDialogComponent);
      return dialogRef.close();
    }),
  );

  // Communicate with Server (this.userService.login),
  // get the Token for authentication and push it to the store
  // make an http call to get the payload username and role
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map(userData => userData.payload),
    exhaustMap((user: any) => {
      return this.userService.login(user.username, user.password)
        .pipe(
          tap(res => {
            this.store.dispatch(new Token({token: {token: res.headers.get('Authorization')}}));
          }),
          switchMap(() => this.http
            .get(`${this.restServiceRoot}${this.currentUserRestPath}`)
            .pipe(
              map((loginInfo: any) => {
              return new LoginSuccess ({
                user: {
                  user: loginInfo.name,
                  role: loginInfo.role,
                  logged: true
                }
              });
            }))
          )
        );
    }),
    catchError(error => of(new LoginFail({error: error})))
  );

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    map(user => user.payload.user.role),
    exhaustMap((role: string) => {
      this.translate.get('alerts.authAlerts.loginSuccess').subscribe((text: string) => {
        this.snackBar.openSnack(text, 4000, 'green');
      });
      if (role === 'CUSTOMER') {
        return this.router.navigate(['restaurant']);
      } else if (role === 'WAITER') {
        return this.router.navigate(['orders']);
      } else if (role === 'MANAGER') {
        return this.router.navigate(['prediction']);
      }
    })
  );

  @Effect({dispatch: false})
  logOut$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      this.router.navigateByUrl('/restaurant');
      this.translate.get('alerts.authAlerts.logoutSuccess').subscribe((text: string) => {
        this.snackBar.openSnack(text, 4000, 'black');
      });
    }),
    catchError(error => of(new LogoutFail({error: error})))
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
    private store: Store<fromAuth.AppState>

  ) {
    this.restPathRoot = this.configService.getValues().restPathRoot;
    this.restServiceRoot = this.configService.getValues().restServiceRoot;
    this.translate.get('alerts.authAlerts').subscribe((content: any) => {
      this.authAlerts = content;
    });
  }
}
