import { Injectable }     from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { LoginDataService } from '../../shared/backend/login/login-data-service';
import { AuthService } from '../../shared/authentication/auth.service';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class UserAreaService {

    constructor(public snackBar: MdSnackBar,
                public authService: AuthService,
                public loginDataService: LoginDataService) { }

    changePassword(data: any): void {
        data.username = this.authService.user;
        this.loginDataService.changePassword(data.username, data.oldPassword, data.newPassword)
            .subscribe( () => {
                    this.snackBar.open('Password change successful', 'OK', {
                        duration: 4000,
                        extraClasses: ['bgc-green-500'],
                    });
                }, (error: any) => {
                    this.snackBar.open('Password change error, old password do not match', 'OK', {
                        duration: 4000,
                        extraClasses: ['bgc-red-600'],
                    });
                });
    }

}
