import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LoadDishesEffects } from './menu.effects';

describe('LoadDishesEffects', () => {
  let actions$: Observable<any>;
  let effects: LoadDishesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadDishesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(LoadDishesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
