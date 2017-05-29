import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FilterCockpitView, ReservationView, OrderListView } from '../../../shared/viewModels/interfaces';
import { BookingDataService } from '../../../shared/backend/booking/booking-data-service';

@Injectable()
export class OrderCockpitService {

  constructor(private bookingDataService: BookingDataService) {
  }

  getBookingOrders(filters: FilterCockpitView): Observable<OrderListView[]> {
    return this.bookingDataService.getBookingOrders(filters)
               .map((orders: OrderListView[]) => orders as OrderListView[]);
  }

  getBookingOrder(id: number): Observable<ReservationView> {
    return this.bookingDataService.getBookingOrder(id)
               .map((orders: ReservationView) => orders as ReservationView);
  }

}
