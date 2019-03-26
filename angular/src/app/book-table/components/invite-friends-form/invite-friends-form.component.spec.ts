import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteFriendsFormComponent } from './invite-friends-form.component';

describe('InviteFriendsFormComponent', () => {
  let component: InviteFriendsFormComponent;
  let fixture: ComponentFixture<InviteFriendsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteFriendsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteFriendsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
