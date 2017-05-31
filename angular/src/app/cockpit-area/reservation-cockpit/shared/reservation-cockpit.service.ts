import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReservationView } from '../../../shared/viewModels/interfaces';
import { FilterCockpit, Pagination } from '../../../shared/backend/backendModels/interfaces';
import { BookingDataService } from '../../../shared/backend/booking/booking-data-service';

@Injectable()
export class ReservationCockpitService {

  constructor(private bookingDataService: BookingDataService) {
  }

  getReservations(pagination: Pagination, filters?: FilterCockpit): Observable<ReservationView[]> {
    if (!filters) {
      filters = {
          bookingDate: undefined,
          email: undefined,
          bookingToken: undefined,
      };
    }
    filters.pagination = pagination;
    return this.bookingDataService.getReservations(filters)
                  .map((orders: ReservationView[]) => orders as ReservationView[]);
    }

}
