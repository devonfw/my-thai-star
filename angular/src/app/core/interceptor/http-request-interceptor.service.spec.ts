import { inject, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromStore from 'app/store/reducers';
import { CoreModule } from '../../core/core.module';
import { HttpRequestInterceptorService } from './http-request-interceptor.service';

describe('HttpRequestInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot(fromStore.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
      providers: [HttpRequestInterceptorService],
    });
  });

  it('should create', inject(
    [HttpRequestInterceptorService],
    (service: HttpRequestInterceptorService) => {
      expect(service).toBeTruthy();
    },
  ));
});
