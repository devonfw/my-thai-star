import { BookingInfo } from '../../shared/backend/backendModels/interfaces';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { BookTableService } from '../shared/book-table.service';
import { ReservationView } from '../../shared/viewModels/interfaces';
import {MD_DIALOG_DATA} from '@angular/material';
import * as moment from 'moment';
import { assign } from 'lodash';

@Component({
  selector: 'public-book-table-dialog',
  templateUrl: './book-table-dialog.component.html',
  styleUrls: ['./book-table-dialog.component.scss'],
})
export class BookTableDialogComponent implements OnInit {

  data: ReservationView;

  constructor (public snackBar: MdSnackBar,
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
    assign(bookTable, this.data);
    bookTable.orders = [];
    bookTable.guestList = [];
    this.bookingService.postBookingTable(bookTable).subscribe( () => {
      this.snackBar.open('Table succesfully booked', 'OK', {
        duration: 7000,
      });
    });
    this.dialog.close(true);
  }

}
