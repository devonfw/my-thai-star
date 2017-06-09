import { TestBed, inject } from '@angular/core/testing';
import {
    BaseRequestOptions,
    HttpModule,
    Http,
    Response,
    ResponseOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { BookingRestService } from './booking-rest.service';
import { HttpClient } from '../../httpClient/httpClient.service';
import { AuthService } from '../../authentication/auth.service';
import { SnackBarService } from '../../snackService/snackService.service';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginDataService } from '../login/login-data-service';
import { LoginInMemoryService } from '../login/login-in-memory.service';
import { WindowService } from '../../windowService/windowService.service';

describe('BookingRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, MaterialModule, RouterTestingModule],
      providers: [
        BookingRestService,
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

  it('should ...', inject([BookingRestService], (service: BookingRestService) => {
    expect(service).toBeTruthy();
  }));
});
