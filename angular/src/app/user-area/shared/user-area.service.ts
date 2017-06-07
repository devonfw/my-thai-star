import { Router } from '@angular/router';
import { LoginInfo } from '../../shared/backend/backendModels/interfaces';
import { Injectable }     from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { LoginDataService } from '../../shared/backend/login/login-data-service';
import { SnackBarService } from '../../shared/snackService/snackService.service';
import { AuthService } from '../../shared/authentication/auth.service';

@Injectable()
export class UserAreaService {

    constructor(public snackBar: SnackBarService,
                public router: Router,
                public authService: AuthService,
                public loginDataService: LoginDataService) { }

    login(username: string, password: string): void {
        this.loginDataService.login(username, password)
            .subscribe((token: string) => {
                this.authService.setToken(token);
                this.loginDataService.getCurrentUser()
                    .subscribe( (loginInfo: LoginInfo) => {
                        this.authService.setLogged(true);
                        this.authService.setUser(loginInfo.username);
                        this.authService.setRole(loginInfo.role);
                        this.router.navigate(['orders']);
                        this.snackBar.openSnack('Login successful', 4000, 'green');
                    });
                }, (err: any) => {
                    this.authService.setLogged(false);
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
                this.authService.setLogged(false);
                this.authService.setUser('');
                this.authService.setRole('user');
                this.authService.setToken('');
                this.snackBar.openSnack('Log out successful, come back soon!', 4000, 'black');
            }, (error: any) => {
                this.snackBar.openSnack('Log out failed, tray again later!', 4000, 'black');
            });
    }

    changePassword(data: any): void {
        data.username = this.authService.getUser();
        this.loginDataService.changePassword(data.username, data.oldPassword, data.newPassword)
            .subscribe( (res: any) => {
                    this.snackBar.openSnack(res.message, 4000, 'green');
                }, (error: any) => {
                    this.snackBar.openSnack(error.message, 4000, 'red');
                });
    }

}
