import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommentDialogComponent } from './comment-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'app/core/core.module';
describe('CommentDialogComponent', () => {
  let component: CommentDialogComponent;
  let fixture: ComponentFixture<CommentDialogComponent>;
  beforeEach(() => {
    const matDialogRefStub = { close: (comment1) => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [CoreModule, TranslateModule.forRoot()],
      declarations: [CommentDialogComponent],
      providers: [{ provide: MatDialogRef, useValue: matDialogRefStub }],
    });
    fixture = TestBed.createComponent(CommentDialogComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
