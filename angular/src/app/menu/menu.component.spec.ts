import { HttpClient, HttpClientModule } from '@angular/common/http';
import { /* ComponentFixture, */ TestBed, async } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';

import { SidenavService } from '../sidenav/shared/sidenav.service';
import { MenuService } from './shared/menu.service';
import { SnackBarService } from '../core/snackService/snackService.service';
import { AuthService } from '../core/authentication/auth.service';
import { MatSlider, MatInput } from '@angular/material';

import { MenuComponent } from './menu.component';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { TranslateModule } from '@ngx-translate/core';

describe('MenuComponent', () => {
  let component: MenuComponent;
  // let fixture: ComponentFixture<MenuComponent>;
  let http: HttpClient;
  let menuService: MenuService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        MenuCardComponent,
      ],
      providers: [
        HttpClient,
        SidenavService,
        MenuService,
        SnackBarService,
        AuthService,
        MatSlider,
        MatInput,
      ],
      imports: [
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        FormsModule,
        CoreModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(MenuComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    menuService = new MenuService(http);
    component = new MenuComponent(menuService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
