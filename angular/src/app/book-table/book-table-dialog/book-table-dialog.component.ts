import { MdDialogRef, MdSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { BookTableService } from '../shared/book-table.service';
import { ReservationView } from '../../shared/models/interfaces';
import * as moment from 'moment';

@Component({
  selector: 'public-book-table-dialog',
  templateUrl: './book-table-dialog.component.html',
  styleUrls: ['./book-table-dialog.component.scss'],
})
export class BookTableDialogComponent implements OnInit {

  data: ReservationView;

  constructor (public snackBar: MdSnackBar,
               private bookingService: BookTableService,
               private dialog: MdDialogRef<BookTableDialogComponent>) {
  }

  ngOnInit(): void {
    this.data = {
      event: {
        date: moment(this.dialog.config.data.dateTime).format('DD/MM/YYYY'),
        hour: moment(this.dialog.config.data.dateTime).format('LT'),
        nameOwner: this.dialog.config.data.name,
        emailOwner: this.dialog.config.data.email,
        tableId: this.dialog.config.data.tableId,
      },
      adults: this.dialog.config.data.adults,
      kids: this.dialog.config.data.kids,
    };
    this.bookingService.getTableId().subscribe( (data: ReservationView) => {
      this.data.event.tableId = data.event.tableId;
    });
  }

  sendBooking (): void {
    this.bookingService.postBookingTable(this.data).subscribe( () => {
      this.snackBar.open('Table succesfully booked', 'OK', {
        duration: 7000,
      });
    });
    this.dialog.close(true);
  }

}
