import { TestBed, inject } from '@angular/core/testing';
import { CoreModule } from '../../core/core.module';
import { MockBackend } from '@angular/http/testing';
import { DishesRestService } from './dishes-rest.service';
import { AuthService } from '../../core/authentication/auth.service';
import { SnackBarService } from '../../core/snackService/snackService.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginDataService } from '../login/login-data-service';
import { WindowService } from '../../core/windowService/windowService.service';
import { LoginInMemoryService } from '../login/login-in-memory.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('DishesRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        DishesRestService,
        AuthService,
        SnackBarService,
        MockBackend,
        WindowService,
        HttpClient,
        {provide: LoginDataService, useClass: LoginInMemoryService},
      ],
    });
  });

  it('should create', inject([DishesRestService], (service: DishesRestService) => {
    expect(service).toBeTruthy();
  }));
});
