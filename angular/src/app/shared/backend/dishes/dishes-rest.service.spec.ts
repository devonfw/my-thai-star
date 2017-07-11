import { TestBed, inject } from '@angular/core/testing';
import {
    BaseRequestOptions,
    HttpModule,
    Http,
    Response,
    ResponseOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { DishesRestService } from './dishes-rest.service';
import { HttpClient } from '../../httpClient/httpClient.service';
import { AuthService } from '../../authentication/auth.service';
import { SnackBarService } from '../../snackService/snackService.service';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginDataService } from '../login/login-data-service';
import { WindowService } from '../../windowService/windowService.service';
import { LoginInMemoryService } from '../login/login-in-memory.service';

describe('DishesRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, MaterialModule, RouterTestingModule],
      providers: [
        DishesRestService,
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

  it('should create', inject([DishesRestService], (service: DishesRestService) => {
    expect(service).toBeTruthy();
  }));
});
