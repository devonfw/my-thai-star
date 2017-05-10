import { CovalentCoreModule } from '@covalent/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDialogComponent } from './comment-dialog.component';

describe('CommentDialogComponent', () => {
  let component: CommentDialogComponent;
  let fixture: ComponentFixture<CommentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentDialogComponent ],
      imports: [
        CovalentCoreModule.forRoot(),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
