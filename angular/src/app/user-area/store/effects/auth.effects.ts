import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserAreaService} from '../../services/user-area.service';
import {Router} from '@angular/router';
import {of, Observable} from 'rxjs';
import {AuthActions, AuthActionTypes, LoginFail, LoginSuccess, Logout, LogoutFail, LogoutSuccess} from '../actions/auth.actions';
import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {Credentials} from '../../models/user';
import {TranslateService} from '@ngx-translate/core';
import {SnackBarService} from '../../../core/snack-bar/snack-bar.service';
import {AuthService} from '../../../core/authentication/auth.service';

@Injectable()
export class AuthEffects {
  /*
  * Dispatching the Login action
  * Then communicate with the backend
  * */
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map(action => action.payload.credentials),
    exhaustMap((credentials: Credentials) => {
        return this.userAreaService.login(credentials.username, credentials.password)
          .pipe(map((res: any) => {
            this.translate.get('alerts.authAlerts.loginSuccess').subscribe((text: string) => {
              this.snackBar.openSnack(text, 4000, 'green');
            });
              localStorage.setItem('user', JSON.stringify({user: res.name, currentRole: res.role, logged: true}));
            return new LoginSuccess({userData: {user: res.name, currentRole: res.role, logged: true}});
          }),
          catchError(error => of(new LoginFail({error: error})))
          );
      }));

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(() => {
      this.router.navigateByUrl('/orders');
    })
  );

  @Effect({dispatch: false})
  loginFail$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAIL),
    map(() => {
      this.translate.get('alerts.accessError').subscribe((text: string) => {
        this.snackBar.openSnack(text, 4000, 'red');
      });
      this.router.navigateByUrl('/restaurant');
    })
  );

  @Effect({dispatch: false})
  logOut$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      localStorage.setItem('user', JSON.stringify({user: '', currentRole: 'CUSTOMER', logged: false}));
      this.router.navigateByUrl('/restaurant');
      this.translate.get('alerts.authAlerts.logoutSuccess').subscribe((text: string) => {
        this.snackBar.openSnack(text, 4000, 'black');
      });
    }),
    catchError(error => of(new LogoutFail({error: error})))
  );

  constructor(
    private actions$: Actions<AuthActions>,
    private authService: AuthService,
    private userAreaService: UserAreaService,
    private router: Router,
    public translate: TranslateService,
    public snackBar: SnackBarService,
  ) {}
}

