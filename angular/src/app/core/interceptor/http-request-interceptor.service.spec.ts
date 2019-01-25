import { CoreModule } from '../../core/core.module';
import { TestBed, inject } from '@angular/core/testing';
import { HttpRequestInterceptorService } from './http-request-interceptor.service';

describe('HttpRequestInterceptorService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CoreModule],
            providers: [HttpRequestInterceptorService],
        });
    });

    it('should create', inject([HttpRequestInterceptorService], (service: HttpRequestInterceptorService) => {
        expect(service).toBeTruthy();
    }));
});
