import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AuthService } from '../../core/authentication/auth.service';
import { CoreModule } from '../../core/core.module';
import { SnackBarService } from '../../core/snack-bar/snack-bar.service';
import * as fromRoot from '../../store/reducers';
import { UserAreaService } from './user-area.service';
import { TranslocoRootModule } from '../../transloco-root.module';

describe('UserAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAreaService, AuthService, SnackBarService],
      imports: [
        CoreModule,
        HttpClientTestingModule,
        TranslocoRootModule,
        RouterTestingModule,
        StoreModule.forRoot(fromRoot.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
    });
  });

  it('should create', inject([UserAreaService], (service: UserAreaService) => {
    expect(service).toBeTruthy();
  }));
});
