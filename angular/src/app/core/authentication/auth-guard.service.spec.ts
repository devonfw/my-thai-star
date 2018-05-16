import { CoreModule } from '../../core/core.module';
import { TestBed, inject } from '@angular/core/testing';
import { AuthGuardService } from 'app/core/authentication/auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [CoreModule,
                  TranslateModule.forRoot(),
                  RouterTestingModule],
        providers: [AuthGuardService],
    });
  });

  it('should create', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
