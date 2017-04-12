import { CovalentCoreModule } from '@covalent/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavSharedServiceService } from '../../sidenav/shared/sidenav-shared-service.service';

import { MenuCardComponent } from './menu-card.component';

describe('MenuCardComponent', () => {
  let component: MenuCardComponent;
  let fixture: ComponentFixture<MenuCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCardComponent ],
      providers: [SidenavSharedServiceService],
      imports: [
        CovalentCoreModule.forRoot()
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCardComponent);
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
