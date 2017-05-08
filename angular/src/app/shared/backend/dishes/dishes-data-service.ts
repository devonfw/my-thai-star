import { Observable } from 'rxjs/Observable';
import { Dish } from './dish';

import { BackendConfig, BackendType } from '../backend.module';
import { DishesInMemoryService } from './dishes-in-memory.service';
import { DishesRestService } from './dishes-rest.service';
import { OnInit, Injector, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IDishesDataService } from './dishes-data-service-interface';

@Injectable()
export class DishesDataService implements IDishesDataService {

    usedImplementation: IDishesDataService;

    constructor(private injector: Injector) {
        const backendConfig: BackendConfig =   this.injector.get(BackendConfig);
        if (backendConfig.environmentType === BackendType.IN_MEMORY) {
            this.usedImplementation = new DishesInMemoryService();
        } else { // default
            this.usedImplementation = new DishesRestService(this.injector);
        }
    }

    get(): Observable<Dish[]> {
        return this.usedImplementation.get();
    }

}
