import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookTableService } from '../../shared/book-table.service';
import * as moment from 'moment';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/reducers';
import {BookingInfo} from '../../../shared/backend-models/interfaces';
import {Observable} from 'rxjs';
import {Booking} from '../../models/booking.model';

@Component({
  selector: 'public-book-table-dialog',
  templateUrl: './book-table-dialog.component.html',
  styleUrls: ['./book-table-dialog.component.scss'],
})
export class BookTableDialogComponent implements OnInit {
  booking: Booking;

  data: any;
  date: string;

  constructor (
    public bookingService: BookTableService,
    private dialog: MatDialogRef<BookTableDialogComponent>,
  ) {
  }

  ngOnInit(): void {
    this.date = moment(this.data.bookingDate).format('LLL');
  }

  sendBooking (): void {

    this.dialog.close(true);
  }


}
