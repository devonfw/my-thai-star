import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCardDetailsComponent } from './menu-card-details.component';

describe('MenuCardDetailsComponent', () => {
  let component: MenuCardDetailsComponent;
  let fixture: ComponentFixture<MenuCardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCardDetailsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
