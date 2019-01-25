import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateTimeAdapter } from 'ng-pick-datetime';

import { CoreModule } from '../core/core.module';

import { WindowService } from '../core/window/window.service';
import { AuthService } from '../core/authentication/auth.service';
import { SnackBarService } from '../core/snack-bar/snack-bar.service';
import { UserAreaService } from '../user-area/shared/user-area.service';

import { SidenavModule } from '../sidenav/sidenav.module';
import { HeaderComponent } from './header.component';
import { TranslateModule } from '@ngx-translate/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [WindowService, AuthService, UserAreaService, SnackBarService, HttpClient, DateTimeAdapter],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        CoreModule,
        SidenavModule,
        HttpClientModule,
      ],
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
