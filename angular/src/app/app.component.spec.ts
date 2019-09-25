import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import * as fromStore from './store/reducers';
import { NgxElectronModule } from 'ngx-electron';
import { AppComponent } from './app.component';
import { AuthService } from './core/authentication/auth.service';
import { ConfigService } from './core/config/config.service';
import { CoreModule } from './core/core.module';
import { SnackBarService } from './core/snack-bar/snack-bar.service';
import { WindowService } from './core/window/window.service';
import { HeaderComponent } from './header/header.component';
import { SidenavModule } from './sidenav/sidenav.module';
import { UserAreaService } from './user-area/services/user-area.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent],
      providers: [
        WindowService,
        AuthService,
        UserAreaService,
        SnackBarService,
        ConfigService,
      ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        NgxElectronModule,
        CoreModule,
        TranslateModule.forRoot(),
        SidenavModule,
        HttpClientModule,
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
