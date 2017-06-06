import { Observable } from 'rxjs/Observable';
import { Injector, Injectable } from '@angular/core';

import { BackendConfig, BackendType } from '../backend.module';
import { OrderInMemoryService } from './order-in-memory.service';
import { OrderRestService } from './order-rest.service';
import { IOrderDataService } from './order-data-service-interface';
import { OrderListView } from '../../viewModels/interfaces';
import { FilterCockpit, OrderListInfo } from '../backendModels/interfaces';

@Injectable()
export class OrderDataService implements IOrderDataService {

    usedImplementation: IOrderDataService;

    constructor(private injector: Injector) {
        const backendConfig: BackendConfig = this.injector.get(BackendConfig);
        if (backendConfig.environmentType === BackendType.IN_MEMORY) {
            this.usedImplementation = new OrderInMemoryService();
        } else { // default
            this.usedImplementation = new OrderRestService(this.injector);
        }
    }

    getBookingOrders(filter: FilterCockpit): Observable<OrderListView[]> {
        return this.usedImplementation.getBookingOrders(filter);
    }

    saveOrders(orders: OrderListInfo): Observable<number> {
        return this.usedImplementation.saveOrders(orders);
    }

    cancelOrder(token: string): Observable<number> {
         return this.usedImplementation.cancelOrder(token);
     }
}
