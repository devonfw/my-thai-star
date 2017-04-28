import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { CovalentCoreModule } from '@covalent/core';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { MenuCardMobileComponent } from './menu-card-mobile/menu-card-mobile.component';
import { SidenavService } from '../sidenav/shared/sidenav.service';
import { MenuService } from './shared/menu.service';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent, MenuCardComponent, MenuCardMobileComponent ],
      providers: [SidenavService, MenuService],
      imports: [
        BrowserAnimationsModule,
        CovalentCoreModule.forRoot()
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
