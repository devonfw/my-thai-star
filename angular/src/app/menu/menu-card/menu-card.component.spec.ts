import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from '../../core/core.module';

import { SidenavService } from '../../sidenav/shared/sidenav.service';
import { MenuService } from '../shared/menu.service';
import { SnackBarService } from '../../core/snackService/snackService.service';
import { AuthService } from '../../core/authentication/auth.service';

import { MenuCardComponent } from './menu-card.component';
import { MenuCardCommentsComponent } from './menu-card-comments/menu-card-comments.component';
import { MenuCardDetailsComponent } from './menu-card-details/menu-card-details.component';
import { TranslateModule } from '@ngx-translate/core';

describe('MenuCardComponent', () => {
  let component: MenuCardComponent;
  let fixture: ComponentFixture<MenuCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuCardComponent,
        MenuCardCommentsComponent,
        MenuCardDetailsComponent,
      ],
      providers: [MenuService, SidenavService, AuthService, SnackBarService],
      imports: [TranslateModule.forRoot(), CoreModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCardComponent);
    component = fixture.componentInstance;
    component.menuInfo = {
      dish: {
        id: 0,
        name: '',
        description: '',
        price: 0,
      },
      image: { content: 'string' },
      extras: [],
      likes: 0,
      isfav: true,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
