import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginInfo } from './loginInfo';
import { ILoginDataService } from './login-data-service-interface';
import { users } from '../mock-data';
import { omit, find } from 'lodash';

@Injectable()
export class LoginInMemoryService implements ILoginDataService {

  login(username: string, password: string): Observable <LoginInfo> {
   return Observable.of(omit(find(users, { 'username': username, 'password': password }), 'password'));
  }

}
