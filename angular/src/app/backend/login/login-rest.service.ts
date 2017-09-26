import { environment } from './../../../environments/environment';
import { Injectable, Injector } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginInfo } from '../backendModels/interfaces';
import { ILoginDataService } from './login-data-service-interface';
import { config } from '../../config';
import { HttpClientService } from '../../core/httpClient/httpClient.service';

@Injectable()
export class LoginRestService implements ILoginDataService {

  private readonly loginRestPath: string = 'login';
  private readonly currentUserRestPath: string = 'security/v1/currentuser/';
  private readonly logoutRestPath: string = 'logout';
  private readonly registerRestPath: string = 'register';
  private readonly changePasswordRestPath: string = 'changepassword';

  private http: HttpClientService;

  constructor(private injector: Injector) {
    this.http = this.injector.get(HttpClientService);
  }

  login(username: string, password: string): Observable<string> {
    return this.http.post(`${environment.restPathRoot}${this.loginRestPath}`, {username: username, password: password});
  }

  getCurrentUser(): Observable<LoginInfo> {
    return this.http.get(`${environment.restServiceRoot}${this.currentUserRestPath}`)
      .map((res: Response) => res.json());
  }

  register(email: string, password: string): Observable<LoginInfo> {
    return this.http.post(`${environment.restServiceRoot}${this.registerRestPath}`, {email: email, password: password})
      .map((res: Response) => res.json());
  }

  changePassword(username: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${environment.restServiceRoot}${this.changePasswordRestPath}`,
        {username: username, oldPassword: oldPassword, newPassword: newPassword},
      )
      .map((res: Response) => res.json());
  }

}
