import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CommentDialogComponent } from './comment-dialog.component';
describe('CommentDialogComponent', () => {
  let component: CommentDialogComponent;
  let fixture: ComponentFixture<CommentDialogComponent>;
  beforeEach(() => {
    const matDialogRefStub = { close: comment1 => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CommentDialogComponent],
      providers: [{ provide: MatDialogRef, useValue: matDialogRefStub }]
    });
    fixture = TestBed.createComponent(CommentDialogComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
