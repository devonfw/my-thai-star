import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { UserAreaService } from '../../shared/user-area.service';
import {Router} from '@angular/router';
import {defer, Observable, of} from 'rxjs';
import {AuthActions, AuthActionTypes, LoginFail, LoginSuccess, Logout, LogoutFail} from '../actions/auth.actions';
import {map, exhaustMap, tap, catchError} from 'rxjs/operators';
import {LoginInfo} from '../../../shared/backend-models/interfaces';
import {Credentials, User} from '../../models/user';
import {TranslateService} from '@ngx-translate/core';
import {SnackBarService} from '../../../core/snack-bar/snack-bar.service';

@Injectable()
export class AuthEffects {

  @Effect()
  init$ = defer(() => {

    const userData = localStorage.getItem('user');
    console.log(JSON.parse(userData), 'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');

    if (userData) {
      console.log(JSON.parse(userData), 'PPPPPPPPPPPPPPPPPPPPPPPP');
      return of(new LoginSuccess(JSON.parse(userData)));
    }

    return <any> of(new Logout());

  });

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map(action => action.payload.credentials),
    exhaustMap((credentials: Credentials) => {
        return this.authService.login(credentials.username, credentials.password).pipe(
          map((res: any) => {
            this.translate.get('alerts.authAlerts.loginSuccess').subscribe((text: string) => {
              this.snackBar.openSnack(text, 4000, 'green');
            });
            localStorage.setItem('user', JSON.stringify(res.name));
            localStorage.setItem('currentRole', JSON.stringify(res.role));
            localStorage.setItem('logged', JSON.stringify(true));
            return new LoginSuccess({userData: {user: res.name, currentRole: res.role, logged: true}});
          }),
          catchError(error => of(new LoginFail({error: error})))
        );
      }
    )
  );

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(() => {
      this.router.navigateByUrl('/orders');
    })
  );

  @Effect({ dispatch: false })
  loginFail$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAIL),
    map(() => {
      this.translate.get('alerts.accessError').subscribe((text: string) => {
        this.snackBar.openSnack(text, 4000, 'red');
      });
      this.router.navigateByUrl('/restaurant');
    })
  );

  @Effect({ dispatch: false })
  logOut$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      this.translate.get('alerts.authAlerts.logoutSuccess').subscribe((text: string) => {
        this.snackBar.openSnack(text, 4000, 'black');
      });
    }),
    catchError(error => of(new LogoutFail({error: error})))
  );


  constructor(
    private actions$: Actions<AuthActions>,
    private authService: UserAreaService,
    private router: Router,
    public translate: TranslateService,
    public snackBar: SnackBarService,
  ) {}
}
