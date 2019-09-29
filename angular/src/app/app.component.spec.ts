import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ElectronService, NgxElectronModule } from 'ngx-electron';
import { AppComponent } from './app.component';
import { AuthGuardService } from './core/authentication/auth-guard.service';
import { AuthService } from './core/authentication/auth.service';
import { ConfigService } from './core/config/config.service';
import { CoreModule } from './core/core.module';
import { SnackBarService } from './core/snack-bar/snack-bar.service';
import { WindowService } from './core/window/window.service';
import { SidenavService } from './sidenav/services/sidenav.service';
import * as fromStore from './store';
import * as fromUser from './user-area/store';
import { UserAreaService } from './user-area/services/user-area.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
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
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        CoreModule,
        TranslateModule.forRoot(),
        NgxElectronModule,
        EffectsModule.forRoot(fromStore.effects),
        StoreModule.forRoot(fromStore.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
        EffectsModule.forFeature(fromUser.effects),
        StoreModule.forFeature('auth', fromUser.reducers),
      ],
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
