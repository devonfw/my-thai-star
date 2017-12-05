import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { CoreModule } from '../../core/core.module';
import { MockBackend } from '@angular/http/testing';
import { LoginRestService } from './login-rest.service';
import { AuthService } from '../../core/authentication/auth.service';
import { SnackBarService } from '../../core/snackService/snackService.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginDataService } from '../login/login-data-service';
import { WindowService } from '../../core/windowService/windowService.service';
import { LoginInMemoryService } from '../login/login-in-memory.service';

describe('LoginRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        LoginRestService,
        AuthService,
        SnackBarService,
        MockBackend,
        WindowService,
        HttpClient,
        {provide: LoginDataService, useClass: LoginInMemoryService},
      ],
    });
  });

  it('should create', inject([LoginRestService], (service: LoginRestService) => {
    expect(service).toBeTruthy();
  }));
});
