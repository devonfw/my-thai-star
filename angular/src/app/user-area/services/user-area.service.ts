import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SnackService } from './snack-bar.service';
import { AuthService } from '../../core/authentication/auth.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../core/config/config.service';
import { Observable } from 'rxjs';
import { TwoFactorResponse } from '../../shared/view-models/interfaces';
import { Store } from '@ngrx/store';
import * as fromAuth from '../store/reducers/';
import {Logout, OpenDialog} from '../store/actions/auth.actions';

@Injectable()
export class UserAreaService {
  private readonly restPathRoot: string;
  private readonly restServiceRoot: string;
  private readonly loginRestPath: string = 'login';
  private readonly verifyRestPath: string = 'verify';
  private readonly usermanagementRestPath: string = 'usermanagement/v1/user/';
  private readonly pairingRestPath: string = 'pairing/';
  private readonly twofactorRestPath: string = 'twofactor/';
  private readonly currentUserRestPath: string = 'security/v1/currentuser/';
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
      {username: username, password: password},
      {responseType: 'text', observe: 'response'},
    );
  }

  private loginHandler() {
    this.http
      .get(`${this.restServiceRoot}${this.currentUserRestPath}`)
      .subscribe((loginInfo: any) => {
        this.authService.setLogged(true);
        this.authService.setUser(loginInfo.name);
        this.authService.setRole(loginInfo.role);
        if (loginInfo.role === 'CUSTOMER') {
          this.router.navigate(['restaurant']);
        } else if (loginInfo.role === 'WAITER') {
          this.router.navigate(['orders']);
        } else if (loginInfo.role === 'MANAGER') {
          this.router.navigate(['prediction']);
        }
        this.snackBar.success(this.authAlerts.loginSuccess);
      });
  }

  verify(username: string, password: string, token: string): void {
    this.http
      .post(
        `${this.restPathRoot}${this.verifyRestPath}`,
        { username: username, password: password, token: token },
        { responseType: 'text', observe: 'response' },
      )
      .subscribe(
        (res: any) => {
          this.authService.setToken(res.headers.get('Authorization'));
          this.loginHandler();
        },
        (err: any) => {
          this.errorHandler(err);
        },
      );
  }

  private errorHandler(err: any) {
    this.authService.setLogged(false);
    this.snackBar.fail(err.message);
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
    return this.http.get<TwoFactorResponse>(
      `${this.restServiceRoot}${this.usermanagementRestPath}${
        this.pairingRestPath
      }${this.authService.getUser()}`,
      { headers: { 'Content-Type': 'text' } },
    );
  }

  twoFactorStatus(): Observable<any> {
    return this.http.get<TwoFactorResponse>(
      `${this.restServiceRoot}${this.usermanagementRestPath}${
        this.twofactorRestPath
      }${this.authService.getUser()}`,
      { headers: { 'Content-Type': 'text' } },
    );
  }

  changeTwoFactor(status: boolean): Observable<any> {
    return this.http.post(
      `${this.restServiceRoot}${this.usermanagementRestPath}${
        this.twofactorRestPath
      }`,
      {
        username: this.authService.getUser(),
        twoFactorStatus: status,
      },
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
    this.store.dispatch(new OpenDialog());
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }
}
