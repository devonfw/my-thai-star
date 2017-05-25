import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FilterCockpitView, ReservationView } from '../../../shared/viewModels/interfaces';
import { BookingDataService } from '../../../shared/backend/booking/booking-data-service';

@Injectable()
export class OrderCockpitService {

  constructor(private bookingDataService: BookingDataService) {
  }

  getBookingOrders(): Observable<ReservationView[]> {
    return this.bookingDataService.getBookingOrders()
               .map((orders: ReservationView[]) => orders as ReservationView[]);
  }

  filterBookingOrders(filters: FilterCockpitView): Observable<ReservationView[]> {
    return this.bookingDataService.filterBookingOrders(filters)
               .map((orders: ReservationView[]) => orders as ReservationView[]);
  }

  getBookingOrder(id: number): Observable<ReservationView> {
    return this.bookingDataService.getBookingOrder(id)
               .map((orders: ReservationView) => orders as ReservationView);
  }

}
