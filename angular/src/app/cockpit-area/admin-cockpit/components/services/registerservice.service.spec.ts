import { TestBed } from '@angular/core/testing';

import { UserService } from './registerservice.service';

describe('RegisterserviceService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
