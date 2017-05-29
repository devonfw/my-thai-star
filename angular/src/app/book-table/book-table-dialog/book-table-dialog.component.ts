import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { BookTableService } from '../shared/book-table.service';
import { SnackBarService } from '../../shared/snackService/snackService.service';
import { ReservationView } from '../../shared/viewModels/interfaces';
import { BookingInfo } from '../../shared/backend/backendModels/interfaces';
import * as moment from 'moment';
import { assign } from 'lodash';

@Component({
  selector: 'public-book-table-dialog',
  templateUrl: './book-table-dialog.component.html',
  styleUrls: ['./book-table-dialog.component.scss'],
})
export class BookTableDialogComponent implements OnInit {

  data: ReservationView;

  constructor (public snackBar: SnackBarService,
               public bookingService: BookTableService,
               private dialog: MdDialogRef<BookTableDialogComponent>,
               @Inject(MD_DIALOG_DATA) dialogData: any) {
                 this.data = dialogData;
  }

  ngOnInit(): void {
    this.data.date = moment(this.data.date).format('LLL');
    this.bookingService.getTableId().subscribe( (bookingId: number) => {
      this.data.bookingId = bookingId;
    });
  }

  sendBooking (): void {
    let bookTable: BookingInfo;
    bookTable = assign(bookTable, this.data);
    bookTable.bookingType = 0;
    bookTable.orders = [];
    this.bookingService.postBookingTable(bookTable).subscribe( () => {
      this.snackBar.openSnack('Table succesfully booked', 4000, 'black');
    });
    this.dialog.close(true);
  }

}
