import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync, tick, flushMicrotasks, flush } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../../../core/core.module';
import { SidenavService } from '../../../sidenav/services/sidenav.service';

import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import { BookTableService } from '../../services/book-table.service';
import { WindowService } from '../../../core/window/window.service';

import { BookTableComponent } from './book-table.component';
import {
  emailValidator,
  EmailValidatorDirective,
} from '../../../shared/directives/email-validator.directive';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs/internal/observable/of';
import { click } from '../../../shared/common/test-utils';

const mockDialog = {
  open: jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of(true)
  })
};

const mockDialogRef = {
  afterClosed: () => of(true)
};

describe('BookTableComponent', () => {
  let component: BookTableComponent;
  let fixture: ComponentFixture<BookTableComponent>;
  let el: DebugElement;
  let dialog: MatDialog;
  let snackBarService: SnackBarService;

  beforeEach(async(() => {
    snackBarService = jasmine.createSpyObj('SnackBarService', ['openSnack']);
    TestBed.configureTestingModule({
      declarations: [BookTableComponent, EmailValidatorDirective],
      providers: [
        BookTableService,
        { provide: SnackBarService, useValue: snackBarService},
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        getTranslocoModule(),
        CoreModule,
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(BookTableComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      dialog = TestBed.get(MatDialog);
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Email should validate (easy)', () => {
    expect(emailValidator(new FormControl('bad@email').value)).toEqual(false);
    expect(emailValidator(new FormControl('good@email.com').value)).toEqual(
      true,
    );
  });

  it('should show Booking Table Dialog', fakeAsync(() => {
    const bookSubmition = el.query(By.css('.bookTableSubmit'));
    click(bookSubmition);
    fixture.detectChanges();
    tick();
    expect(dialog.open).toHaveBeenCalled();
  }));

  it('should show invitation Dialog', fakeAsync(() => {
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    click(tabs[1]);
    fixture.detectChanges();
    tick();
    const inviteSubmition = el.query(By.css('.inviteFriendsSubmit'));
    click(inviteSubmition);
    expect(dialog.open).toHaveBeenCalled();
  }));

  it('should verify proper email', fakeAsync(() => {
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    click(tabs[1]);
    fixture.detectChanges();
    tick();
    const emailInput = el.query(By.css('.guests input'));
    emailInput.nativeElement.value = 'test@gmail.com';
    emailInput.triggerEventHandler('keydown', null);
    fixture.detectChanges();
    flush();
    expect(component.invitationModel.length).toBe(1);
  }));

  it('should verify improper email', fakeAsync(() => {
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    click(tabs[1]);
    fixture.detectChanges();
    tick();
    const emailInput = el.query(By.css('.guests input'));
    emailInput.triggerEventHandler('keydown', null);
    fixture.detectChanges();
    flush();
    expect(snackBarService.openSnack).toHaveBeenCalled();
  }));

  it('should verify invitationModel by removing guest', fakeAsync(() => {
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    click(tabs[1]);
    fixture.detectChanges();
    tick();
    component.invitationModel = ['test1@gmail.com', 'test2@gmail.com'];
    fixture.detectChanges();
    component.removeInvite('test1@gmail.com');
    expect(component.invitationModel.length).toBe(1);
  }));

});
