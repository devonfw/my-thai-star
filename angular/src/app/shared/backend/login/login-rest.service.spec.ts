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

describe('LoginRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        LoginRestService,
        {
            provide: Http,
            useFactory: (mockBackend: MockBackend, options: BaseRequestOptions) => {
                return new Http(mockBackend, options);
            },
            deps: [MockBackend, BaseRequestOptions],
        },
        MockBackend,
        BaseRequestOptions,
      ],
    });
  });

  it('should ...', inject([LoginRestService], (service: LoginRestService) => {
    expect(service).toBeTruthy();
  }));
});
