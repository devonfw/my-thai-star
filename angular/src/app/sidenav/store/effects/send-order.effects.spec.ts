import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SendOrderEffects } from './send-order.effects';

describe('SendOrderEffects', () => {
  let actions$: Observable<any>;
  let effects: SendOrderEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SendOrderEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SendOrderEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
