import { TestBed, inject } from '@angular/core/testing';
import { HttpModule} from '@angular/http';
import { BookTableService } from './book-table.service';
import { BookingInMemoryService } from '../../shared/backend/booking/booking-in-memory.service';
import { BookingDataService } from '../../shared/backend/booking/booking-data-service';

describe('BookTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        BookTableService,
        {provide: BookingDataService, useClass: BookingInMemoryService}],
    });
  });

  it('should ...', inject([BookTableService], (service: BookTableService) => {
    expect(service).toBeTruthy();
  }));
});
