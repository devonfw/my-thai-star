import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../snackService/snackService.service';
import { LoginDataService } from '../backend/login/login-data-service';
import { LoginInfo, Role } from '../backend/backendModels/interfaces';
import { isEmpty, find } from 'lodash';
import { roles } from '../backend/mock-data';

@Injectable()
export class AuthService {
    logged: boolean = false;
    user: string = '';
    currentRole: string = 'user';

    constructor(public snackBar: SnackBarService,
                public router: Router,
                public loginDataService: LoginDataService) { }

    public isLogged(): boolean {
        return this.logged;
    }

    public getPermission(roleName: string): number {
        return find(roles, {name: roleName}).permission;
    }

    public isPermited(userRole: string): boolean {
        return this.getPermission(this.currentRole) === this.getPermission(userRole);
    }

    login(username: string, password: string): void {
        this.loginDataService.login(username, password)
            .subscribe((loginInfo: LoginInfo) => {
                    this.logged = true;
                    this.user = loginInfo.username;
                    this.currentRole = loginInfo.role;
                    this.router.navigate(['orders']);
                    this.snackBar.openSnack('Login successful', 4000, 'green');
                }, (err: any) => {
                    this.logged = false;
                    this.snackBar.openSnack('Error login, user or password do not match', 4000, 'red');
                });
    }

    register(email: string, password: string): void {
        this.loginDataService.register(email, password)
            .subscribe(() => {
                this.snackBar.openSnack('Register successful', 4000, 'green');
            }, (error: any) => {
                this.snackBar.openSnack('Register failed, username already in use', 4000, 'red');
            });
    }

    logout(): void {
        this.logged = false;
        this.currentRole = 'user';
        this.user = '';
        this.snackBar.openSnack('Log out successful, come back soon!', 4000, 'black');
    }
}
