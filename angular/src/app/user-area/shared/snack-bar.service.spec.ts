import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { SnackService } from '../../user-area/shared/snack-bar.service';
import { UserAreaService } from './user-area.service';
import { AuthService } from '../../core/authentication/auth.service';
import { CoreModule } from '../../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

describe('SnackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserAreaService,
        AuthService,
        SnackService,
      ],
      imports: [
        CoreModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
    });
  });

  it('should create', inject([SnackService], (service: SnackService) => {
    expect(service).toBeTruthy();
  }));
});
