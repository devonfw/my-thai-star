import { Observable } from 'rxjs/Observable';
import { LoginInfo } from './loginInfo';

export interface ILoginDataService {

    login(username: string, password: string): Observable<LoginInfo>;

}
