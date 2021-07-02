import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from '../../../core/authentication/auth.service';
import { CoreModule } from '../../../core/core.module';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import { SidenavService } from '../../../sidenav/services/sidenav.service';
import { MenuService } from '../../services/menu.service';
import { MenuCardComponent } from './menu-card.component';
import { MenuCardDetailsComponent } from './menu-card-details/menu-card-details.component';
import { MenuCardCommentsComponent } from './menu-card-comments/menu-card-comments.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { getTranslocoModule } from '../../../transloco-testing.module';

describe('MenuCardComponent', () => {
  let component: MenuCardComponent;
  let fixture: ComponentFixture<MenuCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        MenuCardComponent,
        MenuCardCommentsComponent,
        MenuCardDetailsComponent,
      ],
      providers: [MenuService, SidenavService, AuthService, SnackBarService],
      imports: [CoreModule, getTranslocoModule()],
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
