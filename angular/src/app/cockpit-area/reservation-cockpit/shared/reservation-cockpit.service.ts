import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReservationView } from '../../../shared/viewModels/interfaces';
import { BookingDataService } from '../../../shared/backend/booking/booking-data-service';

@Injectable()
export class ReservationCockpitService {

  constructor(private bookingDataService: BookingDataService) {
  }

  getReservations(): Observable<ReservationView[]> {
    return this.bookingDataService.getReservations()
               .map((orders: ReservationView[]) => orders as ReservationView[]);
  }

  getReservation(tableId: number): Observable<ReservationView> {
    return this.bookingDataService.getReservation(tableId)
               .map((orders: ReservationView) => orders as ReservationView);
  }

}
