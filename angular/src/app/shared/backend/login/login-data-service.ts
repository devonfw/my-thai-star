import { OnInit, Injector, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { environment, BackendType } from './../../../../environments/environment';
import { LoginInMemoryService } from './login-in-memory.service';
import { LoginRestService } from './login-rest.service';
import { ILoginDataService } from './login-data-service-interface';
import { LoginInfo } from './loginInfo';

@Injectable()
export class LoginDataService implements ILoginDataService {

    usedImplementation: ILoginDataService;

    constructor(public injector: Injector) {
        if (environment.backendType === BackendType.REST) {
            this.usedImplementation = new LoginRestService(this.injector);
        } else {
            this.usedImplementation = new LoginInMemoryService();
        }
    }

    login(username: string, password: string): Observable<LoginInfo> {
        return this.usedImplementation.login(username, password);
    }

}
