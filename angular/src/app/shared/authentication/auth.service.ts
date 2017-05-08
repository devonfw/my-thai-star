import { Injectable }     from '@angular/core';
import { LoginDataService } from '../backend/login/login-data-service';
import { LoginInfo } from '../backend/login/loginInfo';

@Injectable()
export class AuthService {
    isLogged: boolean = false;

    constructor(public loginDataService: LoginDataService) { }

    login(username: string, password: string): void {
        this.loginDataService.login(username, password)
            .map((login: LoginInfo) => login as LoginInfo) // TODO: Replace with a converter
            .subscribe((login: LoginInfo) => {
                if (login) {
                    this.isLogged = true;
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
    }
}
