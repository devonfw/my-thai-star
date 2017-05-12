import { Injectable }     from '@angular/core';
import { LoginDataService } from '../backend/login/login-data-service';
import { LoginInfo } from '../backend/login/loginInfo';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
    isLogged: boolean = false;
    user: string = '';
    hasPermission: boolean = false;

    constructor(public loginDataService: LoginDataService) { }

    login(username: string, password: string): void {
        this.loginDataService.login(username, password)
            .map((login: LoginInfo) => login as LoginInfo) // TODO: Replace with a converter
            .subscribe((login: LoginInfo) => {
                if (!_.isEmpty(login)) {
                    this.isLogged = true;
                    this.user = login.username;
                    if (login.role === 'waiter') {
                        this.hasPermission = true;
                    }
                } else {
                    this.isLogged = false;
                }
            });
    }

    register(username: string, password: string, email: string): void {
        // send register info
    }

    logout(): void {
        this.isLogged = false;
        this.hasPermission = false;
    }
}
