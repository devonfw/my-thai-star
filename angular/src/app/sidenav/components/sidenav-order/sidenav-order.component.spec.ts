import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { SidenavOrderComponent } from './sidenav-order.component';
describe('SidenavOrderComponent', () => {
  let component: SidenavOrderComponent;
  let fixture: ComponentFixture<SidenavOrderComponent>;
  beforeEach(() => {
    const matDialogStub = {
      open: commentDialogComponent1 => ({
        afterClosed: () => ({ subscribe: () => ({}) })
      })
    };
    const tdDialogServiceStub = { openAlert: object1 => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SidenavOrderComponent],
      providers: [
        { provide: MatDialog, useValue: matDialogStub },
        { provide: TdDialogService, useValue: tdDialogServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SidenavOrderComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('openCommentDialog', () => {
    it('makes expected calls', () => {
      const tdDialogServiceStub: TdDialogService = fixture.debugElement.injector.get(
        TdDialogService
      );
      spyOn(tdDialogServiceStub, 'openAlert').and.callThrough();
      component.openCommentDialog();
      expect(tdDialogServiceStub.openAlert).toHaveBeenCalled();
    });
  });
  describe('addComment', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.addComment();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });
});
