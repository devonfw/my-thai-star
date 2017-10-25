import { TestBed, inject } from '@angular/core/testing';
import {
    BaseRequestOptions,
    HttpModule,
    Http,
    Response,
    ResponseOptions,
} from '@angular/http';
import { CoreModule } from '../../core/core.module';
import { MockBackend } from '@angular/http/testing';
import { DishesRestService } from './dishes-rest.service';
import { HttpClientService } from '../../core/httpClient/httpClient.service';
import { AuthService } from '../../core/authentication/auth.service';
import { SnackBarService } from '../../core/snackService/snackService.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginDataService } from '../login/login-data-service';
import { WindowService } from '../../core/windowService/windowService.service';
import { LoginInMemoryService } from '../login/login-in-memory.service';

describe('DishesRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, CoreModule, RouterTestingModule],
      providers: [
        DishesRestService,
        HttpClientService,
        AuthService,
        SnackBarService,
        MockBackend,
        BaseRequestOptions,
        WindowService,
        {provide: LoginDataService, useClass: LoginInMemoryService},
      ],
    });
  });

  it('should create', inject([DishesRestService], (service: DishesRestService) => {
    expect(service).toBeTruthy();
  }));
});
