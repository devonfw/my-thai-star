import { Injectable }     from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { LoginInfo } from '../../shared/backend/login/loginInfo';
import { LoginDataService } from '../../shared/backend/login/login-data-service';
import { AuthService } from '../../shared/authentication/auth.service';
import { MdSnackBar } from '@angular/material';
import * as _ from 'lodash';

@Injectable()
export class UserAreaService {

    constructor(public snackBar: MdSnackBar,
                public authService: AuthService,
                public loginDataService: LoginDataService) { }

    changePassword(data: any): Observable<number> {
        data.username = this.authService.user;
        return this.loginDataService.changePassword(data.username, data.oldPassword, data.newPassword);
    }

}
