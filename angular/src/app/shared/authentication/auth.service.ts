import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../snackService/snackService.service';
import { LoginDataService } from '../backend/login/login-data-service';
import { LoginInfo, Role } from '../backend/backendModels/interfaces';
import { isEmpty, find } from 'lodash';
import { config } from '../../config';

@Injectable()
export class AuthService {
    private logged: boolean = false;
    private user: string = '';
    private currentRole: string = 'user';
    private token: string;

    constructor(public snackBar: SnackBarService,
                public router: Router,
                public loginDataService: LoginDataService) { }

    public isLogged(): boolean {
        return this.logged;
    }

    public getUser(): string {
        return this.user;
    }

    public getToken(): string {
        return this.token;
    }

    public getPermission(roleName: string): number {
        return find(config.roles, {name: roleName}).permission;
    }

    public isPermited(userRole: string): boolean {
        return this.getPermission(this.currentRole) === this.getPermission(userRole);
    }

    login(username: string, password: string): void {
        this.loginDataService.login(username, password)
            .subscribe((token: string) => {
                this.token = token;
                this.loginDataService.getCurrentUser()
                    .subscribe( (loginInfo: LoginInfo) => {
                        this.logged = true;
                        this.user = loginInfo.username;
                        this.currentRole = loginInfo.role;
                        this.router.navigate(['orders']);
                        this.snackBar.openSnack('Login successful', 4000, 'green');
                    });
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
        this.loginDataService.logout()
            .subscribe( () => {
                this.logged = false;
                this.currentRole = 'user';
                this.user = '';
                this.token = '';
                this.snackBar.openSnack('Log out successful, come back soon!', 4000, 'black');
            }, (error: any) => {
                this.snackBar.openSnack('Log out failed, tray again later!', 4000, 'black');
            });
    }
}
