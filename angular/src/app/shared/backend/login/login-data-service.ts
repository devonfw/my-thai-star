import { OnInit, Injector, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { BackendConfig, BackendType } from '../backend.module';
import { LoginInMemoryService } from './login-in-memory.service';
import { LoginRestService } from './login-rest.service';
import { ILoginDataService } from './login-data-service-interface';
import { LoginInfo } from '../backendModels/interfaces';

@Injectable()
export class LoginDataService implements ILoginDataService {

    usedImplementation: ILoginDataService;

    constructor(public injector: Injector) {
        const backendConfig: BackendConfig =   this.injector.get(BackendConfig);
        if (backendConfig.environmentType === BackendType.IN_MEMORY) {
            this.usedImplementation = new LoginInMemoryService();
        } else { // default
            this.usedImplementation = new LoginRestService(this.injector);
        }
    }

    login(username: string, password: string): Observable<LoginInfo> {
        return this.usedImplementation.login(username, password);
    }

    register(email: string, password: string): Observable<LoginInfo> {
        return this.usedImplementation.register(email, password);
    }

    changePassword(username: string, oldPassword: string, newPassword: string): Observable<any> {
        return this.usedImplementation.changePassword(username, oldPassword, newPassword);
    }

}
