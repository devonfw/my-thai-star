import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { BookingInfo } from '../../../shared/backend-models/interfaces';
import { last } from 'lodash';
import * as moment from 'moment';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import { WindowService } from '../../../core/window/window.service';
import { emailValidator } from '../../../shared/directives/email-validator.directive';
import { BookTableDialogComponent } from '../../components/book-table-dialog/book-table-dialog.component';
import { InvitationDialogComponent } from '../../components/invitation-dialog/invitation-dialog.component';
import { TranslocoService } from '@ngneat/transloco';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-public-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss'],
})
export class BookTableComponent implements OnInit {
  invitationModel: string[] = [];
  minDate: Date = new Date();
  bookForm: FormGroup;
  invitationForm: FormGroup;

  REGEXP_EMAIL = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  reservationInfo: BookingInfo = {
    booking: {
      name: '',
      email: '',
      bookingDate: undefined,
      bookingType: 0,
    },
    invitedGuests: undefined,
  };

  constructor(
    private window: WindowService,
    private translocoService: TranslocoService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
    title: Title
  ) {
    title.setTitle('Book a table');
  }

  ngOnInit(): void {
    const booking = this.reservationInfo.booking;

    this.invitationForm = new FormGroup({
      bookingDate: new FormControl(booking.bookingDate, Validators.required),
      name: new FormControl(booking.name, Validators.required),
      email: new FormControl(booking.email, [
        Validators.required,
        Validators.pattern(this.REGEXP_EMAIL),
      ]),
      invitedGuests: new FormControl(this.invitationModel),
    });

    this.bookForm = new FormGroup({
      bookingDate: new FormControl(booking.bookingDate, Validators.required),
      name: new FormControl(booking.name, Validators.required),
      email: new FormControl(booking.email, [
        Validators.required,
        Validators.pattern(this.REGEXP_EMAIL),
      ]),
      assistants: new FormControl(booking.assistants, [
        Validators.required,
        Validators.min(1),
        Validators.max(8),
      ]),
    });

    this.getFirstDayWeek();
  }

  get name(): AbstractControl {
    return this.bookForm.get('name');
  }
  get email(): AbstractControl {
    return this.bookForm.get('email');
  }
  get assistants(): AbstractControl {
    return this.bookForm.get('assistants');
  }

  get invName(): AbstractControl {
    return this.invitationForm.get('name');
  }
  get invEmail(): AbstractControl {
    return this.invitationForm.get('email');
  }

  showBookTableDialog(checkbox: MatCheckbox): void {
    this.dialog
      .open(BookTableDialogComponent, {
        width: this.window.responsiveWidth(),
        data: this.bookForm.value,
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this.bookForm.reset();
          checkbox.checked = false;
        }
      });
  }

  showInviteDialog(checkbox: MatCheckbox): void {
    this.dialog
      .open(InvitationDialogComponent, {
        width: this.window.responsiveWidth(),
        data: this.invitationForm.value,
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this.invitationForm.reset();
          this.invitationModel = [];
          checkbox.checked = false;
        }
      });
  }

  validateEmail(event: MatChipInputEvent): void {
    this.invitationModel.push(event.value);
    event.input.value = '';
    if (!emailValidator(last(this.invitationModel))) {
      this.invitationModel.pop();
      this.snackBarService.openSnack(
        this.translocoService.translate('bookTable.formErrors.emailFormat'),
        1000,
        'red',
      );
    }
  }

  removeInvite(invite: string): void {
    const index = this.invitationModel.indexOf(invite);
    if (index >= 0) {
      this.invitationModel.splice(index, 1);
    }
  }

  getFirstDayWeek(): string {
    moment.locale(this.translocoService.getActiveLang());
    const firstDay: string = moment(moment().weekday(0)).format('d');
    return firstDay;
  }
}
