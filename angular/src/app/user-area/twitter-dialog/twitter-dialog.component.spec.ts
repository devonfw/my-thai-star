import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterDialogComponent } from './twitter-dialog.component';

describe('TwitterDialogComponent', () => {
  let component: TwitterDialogComponent;
  let fixture: ComponentFixture<TwitterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
