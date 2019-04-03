import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {SnackBarService} from '../../../core/snack-bar/snack-bar.service';
import {MatCheckbox, MatDialog} from '@angular/material';
import {Booking} from '../../models/booking';
import * as moment from 'moment';
import {BookTableDialogComponent} from '../book-table-dialog/book-table-dialog.component';
import {Store} from '@ngrx/store';
import {BookTableState} from '../../store/reducers';
import {Observable} from 'rxjs';
import * as fromApp from 'app/store/reducers';
import {getBookedTable, getBookingToken} from '../../store/reducers/book-table.reducer';

@Component({
  selector: 'book-table-form',
  templateUrl: './book-table-form.component.html',
  styleUrls: ['./book-table-form.component.css']
})
export class BookTableFormComponent implements OnInit {
  @Input() booking: Booking;
  @Output() submitted = new EventEmitter();
  bookingState$: Observable<BookTableState>;

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
    private translate: TranslateService,
    private store: Store<fromApp.AppState>
  ) {
    this.bookingState$ = this.store.select('bookings');
  }

  ngOnInit() {
    this.bookingState$.subscribe(x => console.log('Tokeennnnnnnnnnnnnnnnn ', x.bookings.bookingResponse));
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

  getFirstDayWeek(): string {
    moment.locale(this.translate.currentLang);
    const firstDay: string = moment(moment().weekday(0)).format('d');
    return firstDay;
  }

  submit() {
    this.submitted.emit(this.bookForm.value);
  }
}
