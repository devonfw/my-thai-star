import { environment } from './../../../environments/environment';
import { Injectable, Injector } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IBookingDataService } from './booking-data-service-interface';
import { BookingInfo, FilterCockpit } from '../backendModels/interfaces';
import { ReservationView } from '../../shared/viewModels/interfaces';
import { config } from '../../config';
import { HttpClientService } from '../../core/httpClient/httpClient.service';

@Injectable()
export class BookingRestService implements IBookingDataService {

  private readonly booktableRestPath: string = 'bookingmanagement/v1/booking';
  private readonly acceptReserveRestPath: string = 'bookingmanagement/v1/invitedguest/accept/';
  private readonly rejectReserveRestPath: string = 'bookingmanagement/v1/invitedguest/decline/';
  private readonly cancelReserveRestPath: string = 'bookingmanagement/v1/booking/cancel/';
  private readonly getReservationsRestPath: string = 'bookingmanagement/v1/booking/search';

  private http: HttpClientService;

  constructor(private injector: Injector) {
    this.http = this.injector.get(HttpClientService);
  }

  bookTable(booking: BookingInfo): Observable < number > {
    return this.http.post(`${environment.restServiceRoot}${this.booktableRestPath}`, booking)
      .map((res: Response) => res.json());

  }

  getReservations(filter: FilterCockpit): Observable < ReservationView[] > {
    return this.http.post(`${environment.restServiceRoot}${this.getReservationsRestPath}`, filter)
      .map((res: Response) => res.json());
  }

  acceptInvite(token: string): Observable < number > {
    return this.http.get(`${environment.restServiceRoot}${this.acceptReserveRestPath}` + token)
      .map((res: Response) => res.json());

  }

  cancelInvite(token: string): Observable < number > {
    return this.http.get(`${environment.restServiceRoot}${this.rejectReserveRestPath}` + token)
      .map((res: Response) => res.json());

  }

  cancelReserve(token: string): Observable < number > {
    return this.http.get(`${environment.restServiceRoot}${this.cancelReserveRestPath}` + token)
      .map((res: Response) => res.json());

  }

}
