import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../core/authentication/auth.service';
import { ConfigService } from '../../core/config/config.service';
import { TwoFactorResponse } from '../../shared/view-models/interfaces';
import * as authActions from '../store/actions/auth.actions';
import * as fromAuth from '../store/reducers/';
import { SnackService } from './snack-bar.service';

@Injectable()
export class UserAreaService {
  private readonly restPathRoot: string;
  private readonly restServiceRoot: string;
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
    public translate: TranslateService,
    private http: HttpClient,
    public authService: AuthService,
    private configService: ConfigService,
    private store: Store<fromAuth.AppState>,
  ) {
    this.restPathRoot = this.configService.getValues().restPathRoot;
    this.restServiceRoot = this.configService.getValues().restServiceRoot;
    this.translate.get('alerts.authAlerts').subscribe((content: any) => {
      this.authAlerts = content;
    });
  }

  login(username: string, password: string) {
    return this.http.post(
      `${this.restPathRoot}${this.loginRestPath}`,
      { username: username, password: password },
      { responseType: 'text', observe: 'response' },
    );
  }

  register(email: string, password: string): void {
    this.http
      .post(`${this.restServiceRoot}${this.registerRestPath}`, {
        email: email,
        password: password,
      })
      // .map((res: LoginInfo) => res)
      .subscribe(
        () => {
          this.snackBar.success(this.authAlerts.registerSuccess);
        },
        () => {
          this.snackBar.fail(this.authAlerts.registerFail);
        },
      );
  }

  pairing(): Observable<any> {
    return this.authService.getUser().pipe(
      switchMap((user: string) => {
        return this.http.get<TwoFactorResponse>(
          `${this.restServiceRoot}${this.usermanagementRestPath}${this.pairingRestPath}${user}`,
          { headers: { 'Content-Type': 'text' } },
        );
      }),
    );
  }

  twoFactorStatus(): Observable<any> {
    return this.authService.getUser().pipe(
      map((user: string) => {
        return `${this.restServiceRoot}${this.usermanagementRestPath}${this.twofactorRestPath}${user}`;
      }),
      switchMap((url: string) => {
        return this.http.get<TwoFactorResponse>(url, {
          headers: { 'Content-Type': 'text' },
        });
      }),
    );
  }

  changeTwoFactor(status: boolean): Observable<any> {
    return this.authService.getUser().pipe(
      switchMap((user: string) => {
        return this.http.post(
          `${this.restServiceRoot}${this.usermanagementRestPath}${this.twofactorRestPath}`,
          {
            username: user,
            twoFactorStatus: status,
          },
        );
      }),
    );
  }

  changePassword(data: any): void {
    data.username = this.authService.getUser();
    this.http
      .post(`${this.restServiceRoot}${this.changePasswordRestPath}`, {
        username: data.username,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })
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
