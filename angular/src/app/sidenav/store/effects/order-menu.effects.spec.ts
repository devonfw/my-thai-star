import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OrderMenuEffects } from './order-menu.effects';

describe('OrderMenuEffects', () => {
  let actions$: Observable<any>;
  let effects: OrderMenuEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderMenuEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(OrderMenuEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
