import { TestBed, inject } from '@angular/core/testing';
import { HttpModule} from '@angular/http';
import { BookingInMemoryService } from '../../shared/backend/booking/booking-in-memory.service';
import { EmailConfirmationsService } from './email-confirmations.service';
import { OrderInMemoryService } from '../../shared/backend/order/order-in-memory.service';
import { OrderDataService } from '../../shared/backend/order/order-data-service';
import { BookingDataService } from '../../shared/backend/booking/booking-data-service';

describe('EmailConfirmationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        EmailConfirmationsService,
        {provide: BookingDataService, useClass: BookingInMemoryService},
        {provide: OrderDataService, useClass: OrderInMemoryService}],
    });
  });

  it('should create', inject([EmailConfirmationsService], (service: EmailConfirmationsService) => {
    expect(service).toBeTruthy();
  }));
});
