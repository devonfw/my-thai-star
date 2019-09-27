import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ElectronService, NgxElectronModule } from 'ngx-electron';
import { AppComponent } from './app.component';
import { BookTableModule } from './book-table/book-table.module';
import { WaiterCockpitModule } from './cockpit-area/cockpit.module';
import { AuthService } from './core/authentication/auth.service';
import { ConfigService } from './core/config/config.service';
import { CoreModule } from './core/core.module';
import { SnackBarService } from './core/snack-bar/snack-bar.service';
import { WindowService } from './core/window/window.service';
import { EmailConfirmationModule } from './email-confirmations/email-confirmations.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { MenuModule } from './menu/menu.module';
import { SidenavModule } from './sidenav/sidenav.module';
import * as fromStore from './store/reducers';
import { UserAreaService } from './user-area/services/user-area.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

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
        UserAreaService,
        SnackBarService,
        ElectronService,
        ConfigService,
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        CoreModule,
        HomeModule,
        HeaderModule,
        MenuModule,
        BookTableModule,
        SidenavModule,
        EmailConfirmationModule,
        WaiterCockpitModule,
        TranslateModule.forRoot(),
        NgxElectronModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot(fromStore.reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
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
