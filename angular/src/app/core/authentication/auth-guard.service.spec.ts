import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthGuardService } from 'app/core/authentication/auth-guard.service';
import * as fromStore from 'app/store/reducers';
import { CoreModule } from '../../core/core.module';
import { getTranslocoModule } from '../../transloco-testing.module';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        getTranslocoModule(),
        RouterTestingModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot(fromStore.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
      providers: [AuthGuardService],
    });
  });

  it('should create', inject(
    [AuthGuardService],
    (service: AuthGuardService) => {
      expect(service).toBeTruthy();
    },
  ));
});
