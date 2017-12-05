import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { CoreModule } from '../../core/core.module';
import { MockBackend } from '@angular/http/testing';
import { OrderRestService } from './order-rest.service';
import { AuthService } from '../../core/authentication/auth.service';
import { SnackBarService } from '../../core/snackService/snackService.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginDataService } from '../login/login-data-service';
import { LoginInMemoryService } from '../login/login-in-memory.service';
import { WindowService } from '../../core/windowService/windowService.service';

describe('OrderRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        CoreModule,
        RouterTestingModule,
      ],
      providers: [
        OrderRestService,
        AuthService,
        SnackBarService,
        MockBackend,
        WindowService,
        HttpClient,
        { provide: LoginDataService, useClass: LoginInMemoryService },
      ],
    });
  });

  it('should create', inject([OrderRestService], (service: OrderRestService) => {
    expect(service).toBeTruthy();
  }));
});
