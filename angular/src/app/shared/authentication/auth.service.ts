import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { LoginDataService } from '../backend/login/login-data-service';
import { LoginInfo } from '../backend/backendModels/interfaces';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthService {
    isLogged: boolean = false;
    user: string = '';
    // Remark: Something more generic than a boolean should be implemented here to allow more that 2 roles and privilages granulation
    // E.g. a method hasPermission should be exposed by this service that takes the role/privilage name as an argument
    hasPermission: boolean = false;

    constructor(public snackBar: MdSnackBar, public loginDataService: LoginDataService) { }

    login(username: string, password: string): void {
        this.loginDataService.login(username, password)
            .subscribe((loginInfo: LoginInfo) => {
                    this.isLogged = true;
                    this.user = loginInfo.username;
                    if (loginInfo.role === 'waiter') {
                        this.hasPermission = true;
                    }
                }, (err: any) => {
                    this.isLogged = false;
                });
    }

    register(email: string, password: string): void {
        this.loginDataService.register(email, password)
            .subscribe(() => {
                this.snackBar.open('Register successful', 'OK', {
                    duration: 4000,
                    extraClasses: ['bgc-green-500'],
                });
            }, (error: any) => {
                this.snackBar.open('Register failed, username already in use', 'OK', {
                    duration: 4000,
                    extraClasses: ['bgc-red-600'],
                });
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
