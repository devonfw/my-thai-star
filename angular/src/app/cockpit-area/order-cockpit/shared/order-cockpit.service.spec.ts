import { TestBed, inject } from '@angular/core/testing';
import { HttpModule} from '@angular/http';
import { OrderCockpitService } from './order-cockpit.service';
import { BookingInMemoryService } from '../../../shared/backend/booking/booking-in-memory.service';
import { BookingDataService } from '../../../shared/backend/booking/booking-data-service';
import { PriceCalculatorService } from '../../../sidenav/shared/price-calculator.service';

describe('OrderCockpitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        OrderCockpitService,
        PriceCalculatorService,
        {provide: BookingDataService, useClass: BookingInMemoryService}],
    });
  });

  it('should ...', inject([OrderCockpitService], (service: OrderCockpitService) => {
    expect(service).toBeTruthy();
  }));
});
