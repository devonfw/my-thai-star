import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginInfo } from './loginInfo';
import { ILoginDataService } from './login-data-service-interface';
import { users } from '../mock-data';
import * as _ from 'lodash';

@Injectable()
export class LoginInMemoryService implements ILoginDataService {

  login(username: string, password: string): Observable <LoginInfo> {
   return Observable.of(_.find(users, { 'username': username, 'password': password }));
  }

}
