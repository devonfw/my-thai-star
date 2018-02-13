import { TestBed, inject } from '@angular/core/testing';

import { SidenavService } from './sidenav.service';

import { CoreModule } from '../../core/core.module';

describe('SidenavSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SidenavService,
      ],
      imports: [
        CoreModule,
      ],
    });
  });

  it('should create', inject([SidenavService], (service: SidenavService) => {
    expect(service).toBeTruthy();
  }));
});
