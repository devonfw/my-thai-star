import { Observable } from 'rxjs/Observable';
import { LoginInfo } from '../backendModels/interfaces';

export interface ILoginDataService {

    login(username: string, password: string): Observable<string>;
    getCurrentUser(): Observable<LoginInfo>;
}
