import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DateTimeAdapter } from '@busacca/ng-pick-datetime';
import { Action, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromStore from 'app/store/reducers';
import { Subject } from 'rxjs/Subject';
import { ConfigService } from '../core/config/config.service';
import { WindowService } from '../core/window/window.service';
import { SidenavService } from '../sidenav/services/sidenav.service';
import { HeaderComponent } from './header.component';

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
  const actions = new Subject<Action>();
  const states = new Subject<fromStore.State>();
  const store = mockStore<fromStore.State>({ actions, states });

  beforeEach(() => {
    const matDialogStub = {
      open: (passwordDialogComponent1, object2) => ({
        afterClosed: () => ({ subscribe: () => ({}) }),
      }),
    };
    const routerStub = { navigate: (array1) => ({}) };
    const sidenavServiceStub = {
      closeSideNav: () => ({}),
      openSideNav: () => ({}),
    };
    const windowServiceStub = { responsiveWidth: () => ({}) };
    const translateServiceStub = { currentLang: {}, use: (lang1) => ({}) };
    const dateTimeAdapterStub = { setLocale: (arg1) => ({}) };
    const configServiceStub = { getValues: () => ({ langs: {} }) };
    const storeStub = { pipe: (arg1) => ({}), dispatch: (arg1) => ({}) };

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HeaderComponent],
      providers: [
        { provide: MatDialog, useValue: matDialogStub },
        { provide: Router, useValue: routerStub },
        { provide: SidenavService, useValue: sidenavServiceStub },
        { provide: WindowService, useValue: windowServiceStub },
        { provide: TranslateService, useValue: translateServiceStub },
        { provide: DateTimeAdapter, useValue: dateTimeAdapterStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: Store, useValue: storeStub },
      ],
    });
    spyOn(HeaderComponent.prototype, 'getFlag');
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(HeaderComponent.prototype.getFlag).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(store, 'pipe').and.callThrough();
      fixture.detectChanges();
      expect(store.pipe).toHaveBeenCalled();
    });
  });
  describe('openLoginDialog', () => {
    it('makes expected calls', () => {
      spyOn(store, 'dispatch').and.callThrough();
      component.openLoginDialog();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
  describe('openResetDialog', () => {
    it('makes expected calls', () => {
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
  describe('openTwitterDialog', () => {
    it('makes expected calls', () => {
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
  describe('logout', () => {
    it('makes expected calls', () => {
      spyOn(store, 'dispatch').and.callThrough();
      component.logout();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
