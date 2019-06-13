import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarService } from 'app/core/snack-bar/snack-bar.service';
import { BookTableService } from 'app/book-table/services/book-table.service';
import { InvitationDialogComponent } from './invitation-dialog.component';
describe('InvitationDialogComponent', () => {
  let component: InvitationDialogComponent;
  let fixture: ComponentFixture<InvitationDialogComponent>;
  beforeEach(() => {
    const matDialogRefStub = { close: arg1 => ({}) };
    const translateServiceStub = {
      get: string1 => ({ subscribe: () => ({}) })
    };
    const snackBarServiceStub = {
      openSnack: (text1, number2, string3) => ({})
    };
    const bookTableServiceStub = {
      postBooking: arg1 => ({ subscribe: () => ({}) }),
      composeBooking: (arg1, number2) => ({})
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [InvitationDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: TranslateService, useValue: translateServiceStub },
        { provide: SnackBarService, useValue: snackBarServiceStub },
        { provide: BookTableService, useValue: bookTableServiceStub }
      ]
    });
    fixture = TestBed.createComponent(InvitationDialogComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('sendInvitation', () => {
    it('makes expected calls', () => {
      const matDialogRefStub: MatDialogRef = fixture.debugElement.injector.get(
        MatDialogRef
      );
      const translateServiceStub: TranslateService = fixture.debugElement.injector.get(
        TranslateService
      );
      const snackBarServiceStub: SnackBarService = fixture.debugElement.injector.get(
        SnackBarService
      );
      const bookTableServiceStub: BookTableService = fixture.debugElement.injector.get(
        BookTableService
      );
      spyOn(matDialogRefStub, 'close').and.callThrough();
      spyOn(translateServiceStub, 'get').and.callThrough();
      spyOn(snackBarServiceStub, 'openSnack').and.callThrough();
      spyOn(bookTableServiceStub, 'postBooking').and.callThrough();
      spyOn(bookTableServiceStub, 'composeBooking').and.callThrough();
      component.sendInvitation();
      expect(matDialogRefStub.close).toHaveBeenCalled();
      expect(translateServiceStub.get).toHaveBeenCalled();
      expect(snackBarServiceStub.openSnack).toHaveBeenCalled();
      expect(bookTableServiceStub.postBooking).toHaveBeenCalled();
      expect(bookTableServiceStub.composeBooking).toHaveBeenCalled();
    });
  });
});
