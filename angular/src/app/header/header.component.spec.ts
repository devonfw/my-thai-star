import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../core/authentication/auth.service';
import { ConfigService } from '../core/config/config.service';
import { CoreModule } from '../core/core.module';
import * as fromStore from '../store/reducers';
import { UserAreaService } from '../user-area/services/user-area.service';
import { HeaderComponent } from './header.component';
import { SidenavModule } from 'app/sidenav/sidenav.module';
import { TranslocoService } from '@ngneat/transloco';
import { getTranslocoModule } from '../transloco-testing.module';

export function mockStore<T>({
  actions = new Subject<Action>(),
  states = new Subject<T>(),
}: {
  actions?: Subject<Action>;
  states?: Subject<T>;
}): Store<T> {
  const result = states as any;
  result.dispatch = (action: Action) => actions.next(action);
  return result;
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translocoService: TranslocoService;
  const actions = new Subject<Action>();
  const states = new Subject<fromStore.State>();
  const store = mockStore<fromStore.State>({ actions, states });

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        CoreModule,
        SidenavModule,
        getTranslocoModule(),
        EffectsModule.forRoot([]),
        StoreModule.forRoot(fromStore.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
      declarations: [HeaderComponent],
      providers: [
        AuthService,
        UserAreaService,
        ConfigService,
        TranslocoService,
      ],
    });
    spyOn(HeaderComponent.prototype, 'getFlag');
    translocoService = TestBed.inject(TranslocoService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('openLoginDialog', () => {
    inject([TranslocoService], (injectService: TranslocoService) => {
      it('makes expected calls', async () => {
        spyOn(store, 'dispatch').and.callThrough();
        component.openLoginDialog();
        expect(store.dispatch).toHaveBeenCalled();
      });
    });
  });
});
