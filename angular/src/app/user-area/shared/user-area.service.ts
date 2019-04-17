import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SnackBarService } from '../../core/snack-bar/snack-bar.service';
import { AuthService } from '../../core/authentication/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../core/config/config.service';

@Injectable()
export class UserAreaService {
  private readonly restPathRoot: string;
  private readonly restServiceRoot: string;
  private readonly loginRestPath: string = 'login';
  private readonly currentUserRestPath: string = 'security/v1/currentuser/';
  private readonly registerRestPath: string = 'register';
  private readonly changePasswordRestPath: string = 'changepassword';
  authAlerts: any;

  constructor(
    public snackBar: SnackBarService,
    public router: Router,
    public translate: TranslateService,
    private http: HttpClient,
    public authService: AuthService,
    private configService: ConfigService
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
          this.http
            .get(`${this.restServiceRoot}${this.currentUserRestPath}`)
            .subscribe((loginInfo: any) => {
              this.authService.setLogged(true);
              this.authService.setUser(loginInfo.name);
              this.authService.setRole(loginInfo.role);
              if (loginInfo.role==="CUSTOMER") 
                this.router.navigate(['restaurant']);
              else if (loginInfo.role==="WAITER")
                this.router.navigate(['orders']);
              else if (loginInfo.role==="MANAGER")
                this.router.navigate(['prediction']);
              this.snackBar.openSnack(
                this.authAlerts.loginSuccess,
                4000,
                'green',
              );
            });
        },
        (err: any) => {
          this.authService.setLogged(false);
          this.snackBar.openSnack(err.message, 4000, 'red');
        },
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
          this.snackBar.openSnack(
            this.authAlerts.registerSuccess,
            4000,
            'green',
          );
        },
        (error: any) => {
          this.snackBar.openSnack(this.authAlerts.registerFail, 4000, 'red');
        },
      );
  }

  logout(): void {
    this.authService.setLogged(false);
    this.authService.setUser('');
    this.authService.setRole('CUSTOMER');
    this.authService.setToken('');
    this.router.navigate(['restarant']);
    this.snackBar.openSnack(this.authAlerts.logoutSuccess, 4000, 'black');
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
          this.snackBar.openSnack(res.message, 4000, 'green');
        },
        (error: any) => {
          this.snackBar.openSnack(error.message, 4000, 'red');
        },
      );
  }
}
