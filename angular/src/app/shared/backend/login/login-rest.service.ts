import { Injectable, Injector } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginInfo } from './loginInfo';
import { ILoginDataService } from './login-data-service-interface';
import { config } from '../../../config';

@Injectable()
export class LoginRestService implements ILoginDataService {

 private readonly loginRestPath: string = '/login';

 private http: Http;

 constructor(private injector: Injector) {
   this.http = this.injector.get(Http);
 }

 login(username: string, password: string): Observable<LoginInfo> {
  return this.http.post(`${config.restServiceRoot}${this.loginRestPath}`, {username: username, password: password})
    .map((res: Response) => res.json());
 }

}
