import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { BookingRestService } from './booking-rest.service';
import { CoreModule } from '../../core/core.module';
import { AuthService } from '../../core/authentication/auth.service';
import { SnackBarService } from '../../core/snackService/snackService.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginDataService } from '../login/login-data-service';
import { LoginInMemoryService } from '../login/login-in-memory.service';

describe('BookingRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        BookingRestService,
        AuthService,
        SnackBarService,
        MockBackend,
        HttpClient,
        {provide: LoginDataService, useClass: LoginInMemoryService},
      ],
    });
  });

  it('should create', inject([BookingRestService], (service: BookingRestService) => {
    expect(service).toBeTruthy();
  }));
});
