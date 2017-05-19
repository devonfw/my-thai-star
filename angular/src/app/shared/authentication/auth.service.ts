import { ifTrue } from 'codelyzer/util/function';
import { Injectable }     from '@angular/core';
import { LoginDataService } from '../backend/login/login-data-service';
import { LoginInfo } from '../backend/login/loginInfo';
import { MdSnackBar } from '@angular/material';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
    isLogged: boolean = false;
    user: string = '';
    hasPermission: boolean = false;

    constructor(public snackBar: MdSnackBar, public loginDataService: LoginDataService) { }

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

    register(email: string, password: string): void {
        this.loginDataService.register(email, password).subscribe( (res: number) => {
            if (res) {
                this.snackBar.open('Register successful', 'OK', {
                    duration: 4000,
                    extraClasses: ['bgc-green-500'],
                });
            } else {
                this.snackBar.open('Register failed, username already in use', 'OK', {
                    duration: 4000,
                    extraClasses: ['bgc-red-600'],
                });
            }
        });
    }

    logout(): void {
        this.isLogged = false;
        this.hasPermission = false;
        this.snackBar.open('Log out successful, come back soon!', 'OK', {
            duration: 4000,
        });
    }
}
