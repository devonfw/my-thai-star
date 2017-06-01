import { TestBed, inject } from '@angular/core/testing';

import { SidenavService } from './sidenav.service';
import { BookingInMemoryService } from '../../shared/backend/booking/booking-in-memory.service';
import { BookingDataService } from '../../shared/backend/booking/booking-data-service';
import { OrderInMemoryService } from '../../shared/backend/order/order-in-memory.service';
import { OrderDataService } from '../../shared/backend/order/order-data-service';
import { CovalentModule } from '../../shared/covalent.module';

describe('SidenavSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SidenavService,
        {provide: BookingDataService, useClass: BookingInMemoryService},
        {provide: OrderDataService, useClass: OrderInMemoryService}],
      imports: [
        CovalentModule,
      ],
    });
  });

  it('should ...', inject([SidenavService], (service: SidenavService) => {
    expect(service).toBeTruthy();
  }));
});
