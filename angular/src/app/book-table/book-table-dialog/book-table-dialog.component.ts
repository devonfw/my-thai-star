import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { BookTableService } from '../shared/book-table.service';
import { SnackBarService } from '../../shared/snackService/snackService.service';
import { ReservationView } from '../../shared/viewModels/interfaces';
import { BookingInfo, ReservationInfo } from '../../shared/backend/backendModels/interfaces';
import * as moment from 'moment';
import { assign } from 'lodash';

@Component({
  selector: 'public-book-table-dialog',
  templateUrl: './book-table-dialog.component.html',
  styleUrls: ['./book-table-dialog.component.scss'],
})
export class BookTableDialogComponent implements OnInit {

  data: any;
  date: string;

  constructor (public snackBar: SnackBarService,
               public bookingService: BookTableService,
               private dialog: MdDialogRef<BookTableDialogComponent>,
               @Inject(MD_DIALOG_DATA) dialogData: any) {
                 this.data = dialogData;
  }

  ngOnInit(): void {
    this.date = moment(this.data.bookingDate).format('LLL');
  }

  sendBooking (): void {
    this.bookingService.postBookingTable(this.bookingService.composeReservation(this.data)).subscribe( () => {
      this.snackBar.openSnack('Table succesfully booked', 4000, 'green');
    }, (error: any) => {
      this.snackBar.openSnack('Error booking, please try again later', 4000, 'red');
    });
    this.dialog.close(true);
  }

}
