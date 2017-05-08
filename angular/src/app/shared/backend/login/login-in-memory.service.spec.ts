import { TestBed, inject } from '@angular/core/testing';

import { LoginInMemoryService } from './login-in-memory.service';

describe('DishesInMemoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginInMemoryService],
    });
  });

  it('should ...', inject([LoginInMemoryService], (service: LoginInMemoryService) => {
    expect(service).toBeTruthy();
  }));
});
