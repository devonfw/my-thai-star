import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReservationView } from '../../../shared/models/interfaces';
import { BookingDataService } from '../../../shared/backend/booking/booking-data-service';

@Injectable()
export class OrderCockpitService {

  constructor(private bookingDataService: BookingDataService) {
  }

  getOrders(): Observable<ReservationView[]> {
    return this.bookingDataService.getOrders()
               .map((orders: ReservationView[]) => orders as ReservationView[]);
  }

}
