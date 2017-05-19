import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginInfo } from './loginInfo';
import { ILoginDataService } from './login-data-service-interface';
import { users } from '../mock-data';
import * as _ from 'lodash';

@Injectable()
export class LoginInMemoryService implements ILoginDataService {

  login(username: string, password: string): Observable <LoginInfo> {
    return Observable.of(_.omit(_.find(users, { 'username': username, 'password': password }), 'password'));
  }

  register(email: string, password: string): Observable <number> {
    let register: LoginInfo = _.find(users, (user: LoginInfo) => { return user.username ===  email; });
    if (register === undefined) {
      users.push({username: email, password: password, role: 'user'});
      return Observable.of(1);
    } else {
      return Observable.of(0);
    }
  }

  changePassword(username: string, oldPassword: string, newPassword: string): Observable<number> {
    let userChange: LoginInfo = _.find(users, (user: LoginInfo) => { return user.username ===  username && user.password === oldPassword; });
    if (userChange) {
      userChange.password = newPassword;
      return Observable.of(1);
    } else {
      return Observable.of(0);
    }
  }

}
