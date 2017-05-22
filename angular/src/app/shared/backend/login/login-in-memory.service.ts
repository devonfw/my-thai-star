import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginInfo } from './loginInfo';
import { ILoginDataService } from './login-data-service-interface';
import { users } from '../mock-data';
import { omit, find } from 'lodash';

@Injectable()
export class LoginInMemoryService implements ILoginDataService {

  login(username: string, password: string): Observable <LoginInfo> {
    const user: LoginInfo = this.findUser(username, password);
    if (!user) {
       return Observable.throw({errorCode: 2, message: 'User name or password wrong'});
    }
    return Observable.of(omit(user, 'password'));
  }

  register(email: string, password: string): Observable <LoginInfo> {
    const existingUser: LoginInfo = find(users, (user: LoginInfo) => user.username ===  email);
    if (existingUser) {
      // Remark: To be agreed wheather registering when user already available is an error
      return Observable.throw({errorCode: 1, message: 'User already exists'});
    }
    const newUser: LoginInfo = {username: email, password: password, role: 'user'};
    users.push(newUser);
    return Observable.of(omit(newUser, 'password'));
  }

  // Remark: Reasonable success response type needs to be defined here
  changePassword(username: string, oldPassword: string, newPassword: string): Observable<any> {
    const userToChange: LoginInfo = this.findUser(username, oldPassword);
    if (!userToChange) {
       return Observable.throw({errorCode: 1, message: 'User already exists'});
    }
    userToChange.password = newPassword;
    return Observable.of({message: 'Password changed'});
  }

  private findUser(username: string, password: string): LoginInfo {
    return find(users, { username: username, password: password });
  }

}
