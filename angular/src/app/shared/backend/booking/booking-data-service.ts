import { Observable } from 'rxjs/Observable';
import { OnInit, Injector, Injectable } from '@angular/core';

import { BackendConfig, BackendType } from '../backend.module';
import { BookingInMemoryService } from './booking-in-memory.service';
import { BookingRestService } from './booking-rest.service';
import { IBookingDataService } from './booking-data-service-interface';
import { ReservationView } from '../../viewModels/interfaces';
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

    getBookingOrders(): Observable<ReservationView[]> {
        return this.usedImplementation.getBookingOrders();
    }

    getBookingOrder(id: number): Observable<ReservationView> {
        return this.usedImplementation.getBookingOrder(id);
    }

    filterBookingOrders(filter: FilterCockpit): Observable<ReservationView[]> {
        return this.usedImplementation.filterBookingOrders(filter);
    }

    getReservations(): Observable<ReservationView[]> {
        return this.usedImplementation.getReservations();
    }

    getReservation(id: number): Observable<ReservationView> {
        return this.usedImplementation.getReservation(id);
    }

    filterReservations(filter: FilterCockpit): Observable<ReservationView[]> {
        return this.usedImplementation.filterReservations(filter);
    }

    saveOrders(orders: OrderListInfo): Observable<ReservationView> {
        return this.usedImplementation.saveOrders(orders);
    }

}
