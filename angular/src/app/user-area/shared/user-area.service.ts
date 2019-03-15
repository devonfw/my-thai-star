import { Router } from '@angular/router';
import {Injectable, OnChanges, OnInit} from '@angular/core';
import { SnackBarService } from '../../core/snack-bar/snack-bar.service';
import { AuthService } from '../../core/authentication/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../core/config/config.service';
import {map, switchMap} from 'rxjs/operators';
import {LoginSuccess, SetToken} from '../store/actions/auth.actions';
import * as fromStore from '../store/reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getToken, getUserState} from '../store/reducers';

@Injectable()
export class UserAreaService implements OnInit{
  getState$: Observable<any>;
  getToken$: Observable<any>;
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
    private configService: ConfigService,
    private store: Store<fromStore.AuthState>
  ) {
    this.restPathRoot = this.configService.getValues().restPathRoot;
    this.restServiceRoot = this.configService.getValues().restServiceRoot;
    this.translate.get('alerts.authAlerts').subscribe((content: any) => {
      this.authAlerts = content;
    });
    this.getState$ = this.store.select(getUserState);
    this.getToken$ = this.store.select(getToken);
  }

  ngOnInit(): void {
    this.getState$.subscribe(state => {
      this.authService.setLogged(state.logged);
      this.authService.setUser(state.user);
      this.authService.setRole(state.currentRole);
    });
    this.getToken$.subscribe(state => {
      this.authService.setToken(state);
    });
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  login(username: string, password: string) {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.http
      .post (
        `${this.restPathRoot}${this.loginRestPath}`,
        { username: username, password: password },
        {headers: httpHeaders, observe: 'response'}
      )
      .pipe (
        switchMap ((res: any) => {
          localStorage.setItem('token', JSON.stringify(res.headers.get('Authorization')));
          return this.http
            .get(`${this.restServiceRoot}${this.currentUserRestPath}`)
            .pipe(
              map ((response: any) => {
                // this.authService.setLogged(true);
                // this.authService.setUser(response.name);
                // this.authService.setRole('WAITER');
                return response;
              }),
            );
        })
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
