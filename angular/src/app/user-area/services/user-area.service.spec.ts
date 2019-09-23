import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { UserAreaService } from './user-area.service';
import { SnackBarService } from '../../core/snack-bar/snack-bar.service';
import { AuthService } from '../../core/authentication/auth.service';
import { CoreModule } from '../../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';

describe('UserAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAreaService, AuthService, SnackBarService],
      imports: [
        CoreModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        StoreModule.forRoot(fromRoot.reducers),
      ],
    });
  });

  it('should create', inject([UserAreaService], (service: UserAreaService) => {
    expect(service).toBeTruthy();
  }));
});
