import { TestBed, inject } from '@angular/core/testing';
import {
    BaseRequestOptions,
    HttpModule,
    Http,
    Response,
    ResponseOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { DishesRestService } from './dishes-rest.service';

describe('DishesRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        DishesRestService,
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

  it('should ...', inject([DishesRestService], (service: DishesRestService) => {
    expect(service).toBeTruthy();
  }));
});
