import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ElectronService, NgxElectronModule } from 'ngx-electron';
import { AppComponent } from './app.component';
import { AuthGuardService } from './core/authentication/auth-guard.service';
import { AuthService } from './core/authentication/auth.service';
import { ConfigService } from './core/config/config.service';
import { CoreModule } from './core/core.module';
import { SnackBarService } from './core/snack-bar/snack-bar.service';
import { WindowService } from './core/window/window.service';
import { SidenavService } from './sidenav/services/sidenav.service';
import { getTranslocoModule } from './transloco-testing.module';
import { UserAreaService } from './user-area/services/user-area.service';
import * as fromUser from './user-area/store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<fromUser.AppState>;

  const state = {
    error: null,
    text: null,
    user: {
      user: '',
      role: 'CUSTOMER',
      logged: false,
    },
    token: {
      token: '',
    },
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [
        WindowService,
        AuthService,
        AuthGuardService,
        UserAreaService,
        SnackBarService,
        ElectronService,
        ConfigService,
        SidenavService,
        { provide: APP_BASE_HREF, useValue: '/' },
        provideMockStore({ initialState: state }),
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        CoreModule,
        getTranslocoModule(),
        NgxElectronModule,
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
