import { TestBed, inject } from '@angular/core/testing';
import {
    BaseRequestOptions,
    HttpModule,
    Http,
    Response,
    ResponseOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LoginRestService } from './login-rest.service';
import { HttpClient } from '../../authentication/httpClient';
import { AuthService } from '../../authentication/auth.service';
import { SnackBarService } from '../../snackService/snackService.service';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginDataService } from '../login/login-data-service';
import { WindowService } from '../../windowService/windowService.service';
import { LoginInMemoryService } from '../login/login-in-memory.service';

describe('LoginRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, MaterialModule, RouterTestingModule],
      providers: [
        LoginRestService,
        HttpClient,
        AuthService,
        SnackBarService,
        MockBackend,
        BaseRequestOptions,
        WindowService,
        {provide: LoginDataService, useClass: LoginInMemoryService},
      ],
    });
  });

  it('should ...', inject([LoginRestService], (service: LoginRestService) => {
    expect(service).toBeTruthy();
  }));
});
