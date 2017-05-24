import { Injectable }     from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { LoginDataService } from '../../shared/backend/login/login-data-service';
import { SnackBarService } from '../../shared/snackService/snackService.service';
import { AuthService } from '../../shared/authentication/auth.service';

@Injectable()
export class UserAreaService {

    constructor(public snackBar: SnackBarService,
                public authService: AuthService,
                public loginDataService: LoginDataService) { }

    changePassword(data: any): void {
        data.username = this.authService.user;
        this.loginDataService.changePassword(data.username, data.oldPassword, data.newPassword)
            .subscribe( (res: any) => {
                    this.snackBar.openSnack(res.message, 4000, 'green');
                }, (error: any) => {
                    this.snackBar.openSnack(error.message, 4000, 'red');
                });
    }

}
