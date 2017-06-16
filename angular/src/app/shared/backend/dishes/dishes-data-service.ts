import { Injector, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BackendType } from './../../../../environments/environment';
import { BackendConfig } from '../backend.module';
import { DishesGraphQlService } from './dishes-graph-ql.service';
import { DishesInMemoryService } from './dishes-in-memory.service';
import { DishesRestService } from './dishes-rest.service';
import { Filter } from '../backendModels/interfaces';
import { IDishesDataService } from './dishes-data-service-interface';
import { DishView } from '../../viewModels/interfaces';

@Injectable()
export class DishesDataService implements IDishesDataService {

    usedImplementation: IDishesDataService;

    constructor(private injector: Injector) {
        const backendConfig: BackendConfig =   this.injector.get(BackendConfig);
        if (backendConfig.environmentType === BackendType.IN_MEMORY) {
            this.usedImplementation = new DishesInMemoryService();
        } else if (backendConfig.environmentType === BackendType.GRAPHQL)  {
            this.usedImplementation = new DishesGraphQlService(this.injector);
        } else { // default
            this.usedImplementation = new DishesRestService(this.injector);
        }
    }

    filter(filters: Filter): Observable<DishView[]> {
        return this.usedImplementation.filter(filters);
    }

}
