import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CovalentCoreModule } from '@covalent/core';
import { BackendModule } from './shared/backend/backend.module';
import { SidenavModule } from './sidenav/sidenav.module';

import { WindowService } from './shared/windowService/windowService.service';
import { AuthService } from './shared/authentication/auth.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent],
      providers: [WindowService, AuthService],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        BackendModule.forRoot({environmentType: 0, restServiceRoot: 'v1'}),
        CovalentCoreModule.forRoot(),
        SidenavModule,
      ],
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
