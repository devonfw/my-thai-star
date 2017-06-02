import { TestBed, inject } from '@angular/core/testing';

import { OrderInMemoryService } from '../../shared/backend/order/order-in-memory.service';
import { OrderDataService } from '../../shared/backend/order/order-data-service';
import { BookingInMemoryService } from '../../shared/backend/booking/booking-in-memory.service';
import { BookingDataService } from '../../shared/backend/booking/booking-data-service';
import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import { WaiterCockpitService } from './waiter-cockpit.service';

describe('WaiterCockpitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WaiterCockpitService,
        PriceCalculatorService,
        {provide: BookingDataService, useClass: BookingInMemoryService},
        {provide: OrderDataService, useClass: OrderInMemoryService}],
      imports: [

      ],
    });
  });

  it('should ...', inject([WaiterCockpitService], (service: WaiterCockpitService) => {
    expect(service).toBeTruthy();
  }));
});
