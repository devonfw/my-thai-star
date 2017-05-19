import { Observable } from 'rxjs/Observable';
import { LoginInfo } from './loginInfo';

export interface ILoginDataService {

    login(username: string, password: string): Observable<LoginInfo>;
    register(email: string, password: string): Observable<number>;
    changePassword(username: string, oldPassword: string, newPassword: string): Observable<number>;

}
