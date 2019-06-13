import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { SidenavService } from './sidenav/services/sidenav.service';
import { AuthService } from './core/authentication/auth.service';
import { ElectronService } from 'ngx-electron';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './core/config/config.service';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    const routerStub = {
      config: { reduce: () => ({}) },
      resetConfig: newRoutes1 => ({}),
      navigate: array1 => ({})
    };
    const routerOutletStub = { isActivated: {}, activatedRoute: {} };
    const sidenavServiceStub = { opened: {} };
    const authServiceStub = {};
    const electronServiceStub = { isElectronApp: {} };
    const translateServiceStub = {
      addLangs: arg1 => ({}),
      setDefaultLang: string1 => ({}),
      getLangs: () => ({}),
      getBrowserLang: () => ({}),
      use: arg1 => ({}),
      currentLang: {}
    };
    const configServiceStub = {
      getValues: () => ({
        version: {},
        langs: { map: () => ({}) },
        enablePrediction: {},
        enableClustering: {}
      })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: RouterOutlet, useValue: routerOutletStub },
        { provide: SidenavService, useValue: sidenavServiceStub },
        { provide: AuthService, useValue: authServiceStub },
        { provide: ElectronService, useValue: electronServiceStub },
        { provide: TranslateService, useValue: translateServiceStub },
        { provide: ConfigService, useValue: configServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('mobileSidenavOpened defaults to: false', () => {
    expect(component.mobileSidenavOpened).toEqual(false);
  });
});
