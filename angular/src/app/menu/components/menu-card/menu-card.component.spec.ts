import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuCardComponent } from './menu-card.component';
import { MenuCardCommentsComponent } from './menu-card-comments/menu-card-comments.component';
import { MenuCardDetailsComponent } from './menu-card-details/menu-card-details.component';
import { TranslateModule } from '@ngx-translate/core';
import {MenuService} from '../../services/menu.service';
import {SidenavService} from '../../../sidenav/services/sidenav.service';
import {CoreModule} from '../../../core/core.module';
import {AuthService} from '../../../core/authentication/auth.service';
import {SnackBarService} from '../../../core/snack-bar/snack-bar.service';

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
