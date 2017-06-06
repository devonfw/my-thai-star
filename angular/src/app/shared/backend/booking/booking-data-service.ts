import { Observable } from 'rxjs/Observable';
import { Injector, Injectable } from '@angular/core';

import { BackendConfig, BackendType } from '../backend.module';
import { BookingInMemoryService } from './booking-in-memory.service';
import { BookingRestService } from './booking-rest.service';
import { IBookingDataService } from './booking-data-service-interface';
import { ReservationView } from '../../viewModels/interfaces';
import { BookingInfo, FilterCockpit } from '../backendModels/interfaces';

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

    bookTable(booking: BookingInfo): Observable<number> {
        return this.usedImplementation.bookTable(booking);
    }

    getReservations(filter: FilterCockpit): Observable<ReservationView[]> {
        return this.usedImplementation.getReservations(filter);
    }

    acceptInvite(token: string): Observable<number> {
         return this.usedImplementation.acceptInvite(token);
     }

    cancelInvite(token: string): Observable<number> {
         return this.usedImplementation.cancelInvite(token);
     }

    cancelReserve(token: string): Observable<number> {
         return this.usedImplementation.cancelReserve(token);
     }
}
