import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatCheckbox } from '@angular/material';
import { BookTableDialogComponent } from '../../container/book-table-dialog/book-table-dialog.component';
import { InvitationDialogComponent } from '../../container/invitation-dialog/invitation-dialog.component';
import { WindowService } from '../../../core/window/window.service';
import { SnackBarService } from '../../../core/snack-bar/snack-bar.service';
import { emailValidator } from '../../../shared/directives/email-validator.directive';
import { last } from 'lodash';
import { AbstractControl } from '@angular/forms/src/model';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import {BookingInfo} from '../../../shared/backend-models/interfaces';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'book-table-form',
  templateUrl: './book-table-form.component.html',
  styleUrls: ['./book-table-form.component.scss'],
})
export class BookTableFormComponent implements OnInit {
  @Output() submitted = new EventEmitter<BookingInfo>();

  invitationModel: string[] = [];
  minDate: Date = new Date();
  REGEXP_EMAIL: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  bookForm = new FormGroup({
    bookingDate: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.REGEXP_EMAIL),
    ]),
    assistants: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(8),
    ]),
    bookingType: new FormControl(0),
  });

  constructor(
    private window: WindowService,
    private translate: TranslateService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
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

  validateEmail(): void {
    if (!emailValidator(last(this.invitationModel))) {
      this.invitationModel.pop();
      this.translate
        .get('bookTable.formErrors.emailFormat')
        .subscribe((text: string) => {
          this.snackBarService.openSnack(text, 1000, 'red');
        });
    }
  }

  getFirstDayWeek(): string {
    moment.locale(this.translate.currentLang);
    const firstDay: string = moment(moment().weekday(0)).format('d');
    return firstDay;
  }

  submit() {
    this.submitted.emit(this.bookForm.value);
  }
}
