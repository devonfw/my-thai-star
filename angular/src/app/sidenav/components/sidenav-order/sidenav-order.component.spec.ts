import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SidenavOrderComponent } from './sidenav-order.component';

describe('SidenavOrderComponent', () => {
  let component: SidenavOrderComponent;
  let fixture: ComponentFixture<SidenavOrderComponent>;
  beforeEach(() => {
    const matDialogStub = {
      open: () => ({
        afterClosed: () => ({ subscribe: () => ({}) }),
      }),
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SidenavOrderComponent],
      providers: [{ provide: MatDialog, useValue: matDialogStub }],
    });
    fixture = TestBed.createComponent(SidenavOrderComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('addComment', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog,
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.addComment();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });
});
