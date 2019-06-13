import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MenuEffects } from './menu.effects';

describe('MenuEffects', () => {
  const actions$: Observable<any>;
  let effects: MenuEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get(MenuEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
