import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';

import { SidenavService } from '../sidenav/shared/sidenav.service';
import { MenuService } from './shared/menu.service';
import { SnackBarService } from '../core/snackService/snackService.service';
import { AuthService } from '../core/authentication/auth.service';

import { MenuComponent } from './menu.component';
import { MenuCardComponent } from './menu-card/menu-card.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        MenuCardComponent,
      ],
      providers: [
        SidenavService,
        MenuService,
        SnackBarService,
        AuthService,
        HttpClient,
      ],
      imports: [
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        HttpClientModule,
        FormsModule,
        CoreModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
