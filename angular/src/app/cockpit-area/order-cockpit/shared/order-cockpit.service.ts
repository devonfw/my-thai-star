import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReservationView } from '../../../shared/viewModels/interfaces';
import { BookingDataService } from '../../../shared/backend/booking/booking-data-service';

@Injectable()
export class OrderCockpitService {

  constructor(private bookingDataService: BookingDataService) {
  }

  getOrders(): Observable<ReservationView[]> {
    return this.bookingDataService.getOrders()
               .map((orders: ReservationView[]) => orders as ReservationView[]);
  }

  // Remark: Method returns a reservation view, so why is it called getOrder?
  getOrder(id: number): Observable<ReservationView> {
    return this.bookingDataService.getOrder(id)
               .map((orders: ReservationView) => orders as ReservationView);
  }

}
