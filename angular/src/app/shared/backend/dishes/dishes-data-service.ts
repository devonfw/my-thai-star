import { Observable } from 'rxjs/Observable';
import { Dish } from './dish';

import { environment, BackendType } from './../../../../environments/environment';
import { DishesInMemoryService } from './dishes-in-memory.service';
import { DishesRestService } from './dishes-rest.service';
import { OnInit, Injector, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {IDishesDataService} from './dishes-data-service-interface';

@Injectable()
export class DishesDataService implements IDishesDataService {

    usedImplementation: IDishesDataService;

    constructor(public injector: Injector) {
        if (environment.backendType === BackendType.REST) {
            this.usedImplementation = new DishesRestService(this.injector);
        } else {
            this.usedImplementation = new DishesInMemoryService();
        }
    }

    get(): Observable<Dish[]> {
        return this.usedImplementation.get();
    }

}
