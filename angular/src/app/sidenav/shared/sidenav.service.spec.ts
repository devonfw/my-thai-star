import { TestBed, inject } from '@angular/core/testing';

import { SidenavService } from './sidenav.service';

describe('SidenavSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavService],
    });
  });

  it('should ...', inject([SidenavService], (service: SidenavService) => {
    expect(service).toBeTruthy();
  }));
});
