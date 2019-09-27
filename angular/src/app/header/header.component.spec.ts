import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DateTimeAdapter } from '@busacca/ng-pick-datetime';
import { Action, Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CoreModule } from 'app/core/core.module';
import * as fromStore from 'app/store/reducers';
import { Subject } from 'rxjs/Subject';
import { ConfigService } from '../core/config/config.service';
import { WindowService } from '../core/window/window.service';
import { SidenavService } from '../sidenav/services/sidenav.service';
import { HeaderComponent } from './header.component';
import { UserAreaService } from 'app/user-area/services/user-area.service';

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
  let translateService: TranslateService;
  const actions = new Subject<Action>();
  const states = new Subject<fromStore.State>();
  const store = mockStore<fromStore.State>({ actions, states });

  beforeEach(() => {
    const matDialogStub = {
      open: () => ({
        afterClosed: () => ({ subscribe: () => ({}) }),
      }),
    };
    const routerStub = { navigate: () => ({}) };
    const sidenavServiceStub = {
      closeSideNav: () => ({}),
      openSideNav: () => ({}),
    };
    const windowServiceStub = { responsiveWidth: () => ({}) };
    const dateTimeAdapterStub = { setLocale: () => ({}) };
    const configServiceStub = { getValues: () => ({ langs: {} }) };
    const storeStub = { pipe: () => ({}), dispatch: () => ({}) };

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        CoreModule,
        TranslateModule.forRoot(),
      ],
      declarations: [HeaderComponent],
      providers: [
        UserAreaService,
        TranslateService,
        { provide: MatDialog, useValue: matDialogStub },
        { provide: Router, useValue: routerStub },
        { provide: SidenavService, useValue: sidenavServiceStub },
        { provide: WindowService, useValue: windowServiceStub },
        { provide: DateTimeAdapter, useValue: dateTimeAdapterStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: Store, useValue: storeStub },
      ],
    });
    spyOn(HeaderComponent.prototype, 'getFlag');
    translateService = TestBed.get(TranslateService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('openLoginDialog', () => {
    inject([TranslateService], (_injectService: TranslateService) => {
      it('makes expected calls', async () => {
        spyOn(store, 'dispatch').and.callThrough();
        component.openLoginDialog();
        expect(store.dispatch).toHaveBeenCalled();
      });
    });
  });
  describe('openResetDialog', () => {
    it('makes expected calls', async () => {
      inject([TranslateService], (_injectService: TranslateService) => {
        const matDialogStub: MatDialog = fixture.debugElement.injector.get(
          MatDialog,
        );
        const windowServiceStub: WindowService = fixture.debugElement.injector.get(
          WindowService,
        );
        spyOn(matDialogStub, 'open').and.callThrough();
        spyOn(windowServiceStub, 'responsiveWidth').and.callThrough();
        component.openResetDialog();
        expect(matDialogStub.open).toHaveBeenCalled();
        expect(windowServiceStub.responsiveWidth).toHaveBeenCalled();
      });
    });
  });
  describe('openTwitterDialog', () => {
    it('makes expected calls', () => {
      inject([TranslateService], (_injectService: TranslateService) => {
        const matDialogStub: MatDialog = fixture.debugElement.injector.get(
          MatDialog,
        );
        const windowServiceStub: WindowService = fixture.debugElement.injector.get(
          WindowService,
        );
        spyOn(matDialogStub, 'open').and.callThrough();
        spyOn(windowServiceStub, 'responsiveWidth').and.callThrough();
        component.openTwitterDialog();
        expect(matDialogStub.open).toHaveBeenCalled();
        expect(windowServiceStub.responsiveWidth).toHaveBeenCalled();
      });
    });
  });
  describe('logout', () => {
    it('makes expected calls', () => {
      inject([TranslateService], (_injectService: TranslateService) => {
        spyOn(store, 'dispatch').and.callThrough();
        component.logout();
        expect(store.dispatch).toHaveBeenCalled();
      });
    });
  });
});
