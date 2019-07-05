import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SnackService } from './snack-bar.service';
import { AuthService } from '../../core/authentication/auth.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../core/config/config.service';
import { WindowService } from '../../core/window/window.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TwoFactorDialogComponent } from '../two-factor-dialog/two-factor-dialog.component';
import { Observable } from 'rxjs/Observable';
import { TwoFactorResponse } from '../../shared/view-models/interfaces';

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
    public window: WindowService,
    public dialog: MatDialog,
    private http: HttpClient,
    public authService: AuthService,
    private configService: ConfigService,
  ) {
    this.restPathRoot = this.configService.getValues().restPathRoot;
    this.restServiceRoot = this.configService.getValues().restServiceRoot;
    this.translate.get('alerts.authAlerts').subscribe((content: any) => {
      this.authAlerts = content;
    });
  }

  login(username: string, password: string): void {
    this.http
      .post(
        `${this.restPathRoot}${this.loginRestPath}`,
        { username: username, password: password },
        { responseType: 'text', observe: 'response' },
      )
      .subscribe(
        (res: any) => {
          this.authService.setToken(res.headers.get('Authorization'));

          if (res.headers.get('X-Mythaistar-Otp') === 'NONE') {
            this.loginHandler();
          } else if (res.headers.get('X-Mythaistar-Otp') === 'OTP') {
            const dialogRef: MatDialogRef<
              TwoFactorDialogComponent
            > = this.dialog.open(TwoFactorDialogComponent, {
              width: this.window.responsiveWidth(),
            });
            dialogRef.afterClosed().subscribe((content: any) => {
              if (content) {
                this.verify(username, password, content.token);
              }
            });
          }
        },
        (err: any) => {
          this.errorHandler(err);
        },
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

  logout(): void {
    this.authService.setLogged(false);
    this.authService.setUser('');
    this.authService.setRole('CUSTOMER');
    this.authService.setToken('');
    this.router.navigate(['restaurant']);
    this.snackBar.info(this.authAlerts.logoutSuccess);
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
}
