import { Observable } from 'rxjs/Observable';
import { OnInit, Injector, Injectable } from '@angular/core';

import { BackendConfig, BackendType } from '../backend.module';
import { BookingInMemoryService } from './booking-in-memory.service';
import { BookingRestService } from './booking-rest.service';
import { IBookingDataService } from './booking-data-service-interface';
import { ReservationView, OrderListView } from '../../viewModels/interfaces';
import { BookingInfo, FilterCockpit, OrderListInfo } from '../backendModels/interfaces';

@Injectable()
export class BookingDataService implements IBookingDataService {

    usedImplementation: IBookingDataService;

    constructor(private injector: Injector) {
        const backendConfig: BackendConfig = this.injector.get(BackendConfig);
        if (backendConfig.environmentType === BackendType.IN_MEMORY) {
            this.usedImplementation = new BookingInMemoryService();
        } else { // default
            this.usedImplementation = new BookingRestService(this.injector);
        }
    }

    getBookingId(): Observable<number> {
        return this.usedImplementation.getBookingId();
    }

    bookTable(booking: BookingInfo): Observable<number> {
        return this.usedImplementation.bookTable(booking);
    }

    getBookingOrders(filter: FilterCockpit): Observable<OrderListView[]> {
        return this.usedImplementation.getBookingOrders(filter);
    }

    getBookingOrder(id: number): Observable<ReservationView> {
        return this.usedImplementation.getBookingOrder(id);
    }

    getReservation(id: number): Observable<ReservationView> {
        return this.usedImplementation.getReservation(id);
    }

    getReservations(filter: FilterCockpit): Observable<ReservationView[]> {
        return this.usedImplementation.getReservations(filter);
    }

    saveOrders(orders: OrderListInfo): Observable<ReservationView> {
        return this.usedImplementation.saveOrders(orders);
    }

}
