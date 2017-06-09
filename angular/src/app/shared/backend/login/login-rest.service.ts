import { Injectable, Injector } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginInfo } from '../backendModels/interfaces';
import { ILoginDataService } from './login-data-service-interface';
import { config } from '../../../config';
import { HttpClient } from '../../httpClient/httpClient.service';

@Injectable()
export class LoginRestService implements ILoginDataService {

  private readonly loginRestPath: string = 'login';
  private readonly currentUserRestPath: string = 'security/v1/currentuser/';
  private readonly logoutRestPath: string = 'logout';
  private readonly registerRestPath: string = 'register';
  private readonly changePasswordRestPath: string = 'changepassword';

  private http: HttpClient;

  constructor(private injector: Injector) {
    this.http = this.injector.get(HttpClient);
  }

  login(username: string, password: string): Observable<string> {
    return this.http.post(`${config.restPathRoot}${this.loginRestPath}`, {username: username, password: password})
  }

  getCurrentUser(): Observable<LoginInfo> {
    return this.http.get(`${config.restServiceRoot}${this.currentUserRestPath}`)
      .map((res: Response) => res.json());
  }

  register(email: string, password: string): Observable<LoginInfo> {
    return this.http.post(`${config.restServiceRoot}${this.registerRestPath}`, {email: email, password: password})
      .map((res: Response) => res.json());
  }

  changePassword(username: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${config.restServiceRoot}${this.changePasswordRestPath}`,
        {username: username, oldPassword: oldPassword, newPassword: newPassword},
      )
      .map((res: Response) => res.json());
  }

}
