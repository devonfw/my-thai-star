import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs/internal/observable/of';
import { CoreModule } from '../../../core/core.module';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import { click } from '../../../shared/common/test-utils';
import {
  emailValidator,
  EmailValidatorDirective,
} from '../../../shared/directives/email-validator.directive';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { BookTableService } from '../../services/book-table.service';
import { BookTableComponent } from './book-table.component';

const mockDialog = {
  open: jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of(true),
  }),
};

const mockDialogRef = {
  afterClosed: () => of(true),
};

describe('BookTableComponent', () => {
  let component: BookTableComponent;
  let fixture: ComponentFixture<BookTableComponent>;
  let el: DebugElement;
  let dialog: MatDialog;
  let snackBarService: SnackBarService;

  beforeEach(waitForAsync(() => {
    snackBarService = jasmine.createSpyObj('SnackBarService', ['openSnack']);
    TestBed.configureTestingModule({
      declarations: [BookTableComponent, EmailValidatorDirective],
      providers: [
        BookTableService,
        { provide: SnackBarService, useValue: snackBarService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        getTranslocoModule(),
        CoreModule,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BookTableComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        dialog = TestBed.inject(MatDialog);
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
