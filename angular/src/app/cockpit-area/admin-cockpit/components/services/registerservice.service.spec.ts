import { TestBed } from '@angular/core/testing';

import { RegisterserviceService } from './registerservice.service';

describe('RegisterserviceService', () => {
  let service: RegisterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
