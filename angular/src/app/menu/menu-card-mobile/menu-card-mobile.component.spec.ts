import { CovalentCoreModule } from '@covalent/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavService } from '../../sidenav/shared/sidenav.service';

import { MenuCardMobileComponent } from './menu-card-mobile.component';

describe('MenuCardMobileComponent', () => {
  let component: MenuCardMobileComponent;
  let fixture: ComponentFixture<MenuCardMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCardMobileComponent ],
      providers: [SidenavService],
      imports: [
        CovalentCoreModule.forRoot()
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCardMobileComponent);
    component = fixture.componentInstance;
    component.menuInfo = {
      orderName: '',
      orderDescription: '',
      price: 0,
      image: '',
      options: [{}],
      likes: 0,
      favourite: false
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
