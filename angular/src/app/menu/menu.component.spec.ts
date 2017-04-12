import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { CovalentCoreModule } from '@covalent/core';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { SidenavSharedServiceService } from '../sidenav/shared/sidenav-shared-service.service';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent, MenuCardComponent ],
      providers: [SidenavSharedServiceService],
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
