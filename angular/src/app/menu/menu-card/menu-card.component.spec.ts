
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavService } from '../../sidenav/shared/sidenav.service';

import { BookingInMemoryService } from '../../shared/backend/booking/booking-in-memory.service';
import { BookingDataService } from '../../shared/backend/booking/booking-data-service';
import { MenuCardComponent } from './menu-card.component';
import { CovalentModule } from '../../shared/covalent.module';

describe('MenuCardComponent', () => {
  let component: MenuCardComponent;
  let fixture: ComponentFixture<MenuCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCardComponent ],
      providers: [
        SidenavService,
        { provide: BookingDataService, useClass: BookingInMemoryService}],
      imports: [
        CovalentModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCardComponent);
    component = fixture.componentInstance;
    component.menuInfo = {
      name: '',
      description: '',
      price: 0,
      image: 'string',
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
