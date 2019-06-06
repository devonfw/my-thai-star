import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BookTableEffects } from './book-table.effects';

describe('BookTableEffects', () => {
  let actions$: Observable<any>;
  let effects: BookTableEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookTableEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(BookTableEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
