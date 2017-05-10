import { TestBed, inject } from '@angular/core/testing';
import { HttpModule} from '@angular/http';
import { BookTableService } from './book-table.service';

describe('BookTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [BookTableService],
    });
  });

  it('should ...', inject([BookTableService], (service: BookTableService) => {
    expect(service).toBeTruthy();
  }));
});
