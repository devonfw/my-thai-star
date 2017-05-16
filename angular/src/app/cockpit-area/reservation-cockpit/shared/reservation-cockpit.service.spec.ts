import { TestBed, inject } from '@angular/core/testing';
import { HttpModule} from '@angular/http';
import { ReservationCockpitService } from './reservation-cockpit.service';
import { BookingInMemoryService } from '../../../shared/backend/booking/booking-in-memory.service';
import { BookingDataService } from '../../../shared/backend/booking/booking-data-service';

describe('CockpitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ReservationCockpitService,
        {provide: BookingDataService, useClass: BookingInMemoryService}],
    });
  });

  it('should ...', inject([ReservationCockpitService], (service: ReservationCockpitService) => {
    expect(service).toBeTruthy();
  }));
});
