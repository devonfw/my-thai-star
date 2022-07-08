import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../core/authentication/auth.service';
import { ConfigService } from '../../core/config/config.service';
import { TwoFactorResponse } from '../../shared/view-models/interfaces';
import * as authActions from '../store/actions/auth.actions';
import * as fromAuth from '../store/reducers/';
import { SnackService } from './snack-bar.service';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class UserAreaService {
  private readonly restPathRoot$: Observable<
    string
  > = this.config.getRestPathRoot();
  private readonly restServiceRoot$: Observable<
    string
  > = this.config.getRestServiceRoot();
  private readonly loginRestPath: string = 'login';
  private readonly usermanagementRestPath: string = 'usermanagement/v1/user/';
  private readonly pairingRestPath: string = 'pairing/';
  private readonly twofactorRestPath: string = 'twofactor/';
  private readonly registerRestPath: string = 'register';
  private readonly changePasswordRestPath: string = 'changepassword';
  authAlerts: any;

  constructor(
    public snackBar: SnackService,
    public router: Router,
    public transloco: TranslocoService,
    private http: HttpClient,
    public authService: AuthService,
    private store: Store<fromAuth.AppState>,
    private config: ConfigService,
  ) {
    this.transloco
      .selectTranslateObject('alerts.authAlerts')
      .subscribe((content: any) => {
        this.authAlerts = content;
      });
  }

  login(username: string, password: string): Observable<any> {
    return this.restPathRoot$.pipe(
      exhaustMap((restPathRoot) =>
        this.http.post(
          `${restPathRoot}${this.loginRestPath}`,
          { username, password },
          { responseType: 'text', observe: 'response' },
        ),
      ),
    );
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.restServiceRoot$
      .pipe(
        exhaustMap((restServiceRoot) =>
          this.http.post(`${restServiceRoot}${this.usermanagementRestPath}${this.registerRestPath}`, {
            username,
            password,
            email,
          }),
        ),
      );
      // .map((res: LoginInfo) => res)
  }

  pairing(): Observable<TwoFactorResponse> {
    return this.authService.getUser().pipe(
      switchMap((user: string) => {
        return this.restServiceRoot$.pipe(
          exhaustMap((restServiceRoot) =>
            this.http.get<TwoFactorResponse>(
              `${restServiceRoot}${this.usermanagementRestPath}${this.pairingRestPath}${user}`,
              { headers: { 'Content-Type': 'text' } },
            ),
          ),
        );
      }),
    );
  }

  twoFactorStatus(): Observable<TwoFactorResponse> {
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.authService.getUser().pipe(
          map((user: string) => {
            return `${restServiceRoot}${this.usermanagementRestPath}${this.twofactorRestPath}${user}`;
          }),
          switchMap((url: string) => {
            return this.http.get<TwoFactorResponse>(url, {
              headers: { 'Content-Type': 'text' },
            });
          }),
        ),
      ),
    );
  }

  changeTwoFactor(status: boolean): Observable<TwoFactorResponse> {
    return this.authService.getUser().pipe(
      switchMap((user: string) => {
        return this.restServiceRoot$.pipe(
          exhaustMap((restServiceRoot) =>
            this.http.post(
              `${restServiceRoot}${this.usermanagementRestPath}${this.twofactorRestPath}`,
              {
                username: user,
                twoFactorStatus: status,
              },
            ),
          ),
        );
      }),
    );
  }

  changePassword(data: any): void {
    data.username = this.authService.getUser();
    this.restServiceRoot$
      .pipe(
        exhaustMap((restServiceRoot) =>
          this.http.post(`${restServiceRoot}${this.changePasswordRestPath}`, {
            username: data.username,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
          }),
        ),
      )
      .subscribe(
        (res: any) => {
          this.snackBar.success(res.message);
        },
        (error: any) => {
          this.snackBar.fail(error.message);
        },
      );
  }

  openLoginDialog(): void {
    this.store.dispatch(authActions.openDialog());
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
