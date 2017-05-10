import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { CovalentCoreModule } from '@covalent/core';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { SidenavService } from '../sidenav/shared/sidenav.service';
import { MenuService } from './shared/menu.service';
import { BackendModule } from './../shared/backend/backend.module';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent, MenuCardComponent ],
      providers: [SidenavService, MenuService],
      imports: [
        BrowserAnimationsModule,
        BackendModule.forRoot({environmentType: 0, restServiceRoot: 'v1'}),
        CovalentCoreModule.forRoot(),
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
