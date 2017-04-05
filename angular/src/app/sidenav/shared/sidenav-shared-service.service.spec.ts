import { TestBed, inject } from '@angular/core/testing';

import { SidenavSharedServiceService } from './sidenav-shared-service.service';

describe('SidenavSharedServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavSharedServiceService]
    });
  });

  it('should ...', inject([SidenavSharedServiceService], (service: SidenavSharedServiceService) => {
    expect(service).toBeTruthy();
  }));
});
