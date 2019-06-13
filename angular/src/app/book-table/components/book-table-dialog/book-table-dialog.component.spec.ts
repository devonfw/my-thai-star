import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { BookTableDialogComponent } from './book-table-dialog.component';
describe('BookTableDialogComponent', () => {
  let component: BookTableDialogComponent;
  let fixture: ComponentFixture<BookTableDialogComponent>;
  beforeEach(() => {
    const matDialogRefStub = { close: arg1 => ({}) };
    const storeStub = { dispatch: arg1 => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BookTableDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: Store, useValue: storeStub }
      ]
    });
    fixture = TestBed.createComponent(BookTableDialogComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('sendBooking', () => {
    it('makes expected calls', () => {
      const matDialogRefStub: MatDialogRef = fixture.debugElement.injector.get(
        MatDialogRef
      );
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(matDialogRefStub, 'close').and.callThrough();
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.sendBooking();
      expect(matDialogRefStub.close).toHaveBeenCalled();
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });
});
