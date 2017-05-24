import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { UserAreaService } from './user-area.service';
import { LoginInMemoryService } from '../../shared/backend/login/login-in-memory.service';
import { LoginDataService } from '../../shared/backend/login/login-data-service';
import { SnackBarService } from '../../shared/snackService/snackService.service';
import { AuthService } from '../../shared/authentication/auth.service';
import { CovalentModule } from '../../shared/covalent.module';

describe('UserAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserAreaService,
        AuthService,
        SnackBarService,
        {provide: LoginDataService, useClass: LoginInMemoryService}],
      imports: [
        CovalentModule,
        RouterTestingModule,
      ],
    });
  });

  it('should ...', inject([UserAreaService], (service: UserAreaService) => {
    expect(service).toBeTruthy();
  }));
});
