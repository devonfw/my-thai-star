import { TestBed, inject } from '@angular/core/testing';
import {
    BaseRequestOptions,
    HttpModule,
    Http,
    Response,
    ResponseOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { OrderRestService } from './order-rest.service';

describe('OrderRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        OrderRestService,
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

  it('should ...', inject([OrderRestService], (service: OrderRestService) => {
    expect(service).toBeTruthy();
  }));
});
