import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { UserAreaService } from './user-area.service';
import { SnackBarService } from '../../core/snackService/snackService.service';
import { AuthService } from '../../core/authentication/auth.service';
import { CoreModule } from '../../core/core.module';
import { HttpClientModule } from '@angular/common/http';

describe('UserAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserAreaService,
        AuthService,
        SnackBarService,
      ],
      imports: [
        CoreModule,
        HttpClientModule,
        RouterTestingModule,
      ],
    });
  });

  it('should create', inject([UserAreaService], (service: UserAreaService) => {
    expect(service).toBeTruthy();
  }));
});
