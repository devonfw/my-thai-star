import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../core/authentication/auth.service';
import { CoreModule } from '../../core/core.module';
import { SnackService } from './snack-bar.service';
import { UserAreaService } from './user-area.service';
import { TranslocoRootModule } from '../../transloco-root.module';

describe('SnackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAreaService, AuthService, SnackService],
      imports: [
        CoreModule,
        HttpClientTestingModule,
        TranslocoRootModule,
        RouterTestingModule,
      ],
    });
  });

  it('should create', inject([SnackService], (service: SnackService) => {
    expect(service).toBeTruthy();
  }));
});
