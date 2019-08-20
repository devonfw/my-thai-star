import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAlertComponent } from './comment-alert.component';

describe('CommentAlertComponent', () => {
  let component: CommentAlertComponent;
  let fixture: ComponentFixture<CommentAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
