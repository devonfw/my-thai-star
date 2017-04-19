import { TestBed, inject } from '@angular/core/testing';

import { BookTableService } from './book-table.service';

describe('BookTableDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookTableService]
    });
  });

  it('should ...', inject([BookTableService], (service: BookTableService) => {
    expect(service).toBeTruthy();
  }));
});
