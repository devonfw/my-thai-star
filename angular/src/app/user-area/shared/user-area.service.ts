import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SnackBarService } from '../../core/snackService/snackService.service';
import { AuthService } from '../../core/authentication/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { LoginInfo } from 'app/shared/backendModels/interfaces';

@Injectable()
export class UserAreaService {

    private readonly loginRestPath: string = 'login';
    private readonly currentUserRestPath: string = 'security/v1/currentuser/';
    private readonly registerRestPath: string = 'register';
    private readonly changePasswordRestPath: string = 'changepassword';

    constructor(public snackBar: SnackBarService,
        public router: Router,
        private http: HttpClient,
        public authService: AuthService) { }

    login(username: string, password: string): void {
        this.http.post(`${environment.restPathRoot}${this.loginRestPath}`,
            { username: username, password: password }, { responseType: 'text', observe: 'response' })
            .subscribe((res: any) => {
                this.authService.setToken(res.headers.get('Authorization'));
                this.http.get(`${environment.restServiceRoot}${this.currentUserRestPath}`)
                    .subscribe((loginInfo: any) => {
                        this.authService.setLogged(true);
                        this.authService.setUser(loginInfo.name);
                        this.authService.setRole(loginInfo.role);
                        this.router.navigate(['orders']);
                        this.snackBar.openSnack('Login successful', 4000, 'green');
                    });
            }, (err: any) => {
                this.authService.setLogged(false);
                this.snackBar.openSnack(err.message, 4000, 'red');
            });
    }

    register(email: string, password: string): void {
        this.http.post(`${environment.restServiceRoot}${this.registerRestPath}`, {email: email, password: password})
            .map((res: LoginInfo) => res)
            .subscribe(() => {
                this.snackBar.openSnack('Register successful', 4000, 'green');
            }, (error: any) => {
                this.snackBar.openSnack('Register failed, username already in use', 4000, 'red');
            });
    }

    logout(): void {
        this.authService.setLogged(false);
        this.authService.setUser('');
        this.authService.setRole('CUSTOMER');
        this.authService.setToken('');
        this.router.navigate(['restarant']);
        this.snackBar.openSnack('Log out successful, come back soon!', 4000, 'black');
    }

    changePassword(data: any): void {
        data.username = this.authService.getUser();
        this.http.post(`${environment.restServiceRoot}${this.changePasswordRestPath}`,
        { username: data.username, oldPassword: data.oldPassword, newPassword: data.newPassword })
            .subscribe((res: any) => {
                this.snackBar.openSnack(res.message, 4000, 'green');
            }, (error: any) => {
                this.snackBar.openSnack(error.message, 4000, 'red');
            });
    }

}
