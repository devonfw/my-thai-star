import { TestBed, inject } from '@angular/core/testing';
import { HttpModule} from '@angular/http';
import { BookTableDialogService } from './book-table-dialog.service';

describe('BookTableDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [BookTableDialogService]
    });
  });

  it('should ...', inject([BookTableDialogService], (service: BookTableDialogService) => {
    expect(service).toBeTruthy();
  }));
});
