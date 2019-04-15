import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {MatCheckbox, MatDialog} from '@angular/material';
import {BookTableDialogComponent} from '../book-table-dialog/book-table-dialog.component';
import {WindowService} from 'app/core/window/window.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'book-table-form',
  templateUrl: './book-table-form.component.html',
  styleUrls: ['./book-table-form.component.scss']
})
export class BookTableFormComponent {
  @Output() submitted = new EventEmitter();

  minDate: Date = new Date();
  REGEXP_EMAIL = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  bookForm = new FormGroup({
    bookingDate: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.REGEXP_EMAIL),
    ]),
    assistants: new FormControl(undefined, [
      Validators.required,
      Validators.min(1),
      Validators.max(8),
    ]),
  });

  constructor(
    private dialog: MatDialog,
    private window: WindowService,
    private translate: TranslateService,
  ) {}

  get name(): AbstractControl {
    return this.bookForm.get('name');
  }
  get email(): AbstractControl {
    return this.bookForm.get('email');
  }
  get assistants(): AbstractControl {
    return this.bookForm.get('assistants');
  }

  getFirstDayWeek(): string {
    moment.locale(this.translate.currentLang);
    const firstDay: string = moment(moment().weekday(0)).format('d');
    return firstDay;
  }

  showBookTableDialog(checkbox: MatCheckbox): void {
    this.dialog
      .open(BookTableDialogComponent, {
        width: this.window.responsiveWidth(),
        data: this.bookForm.value,
      })
      .afterClosed()
      .subscribe(() => {
          this.bookForm.reset();
          checkbox.checked = false;
      });
  }
}
