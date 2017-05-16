import { MdDialogRef, MdSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { BookTableService } from '../shared/book-table.service';
import { ReservationView } from '../../shared/models/interfaces';
import {MD_DIALOG_DATA} from '@angular/material';
import * as moment from 'moment';

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
    this.data = {
      date: moment(this.data.date).format('DD/MM/YYYY'),
      hour: moment(this.data.date).format('LT'),
      creationDate: moment().format('DD/MM/YYYY'),
      creationHour: moment().format('LT'),
      nameOwner: this.data.nameOwner,
      emailOwner: this.data.emailOwner,
      reservationId: -1,
      adults: this.data.adults,
      kids: this.data.kids,
    };
    this.bookingService.getTableId().subscribe( (reservationId: number) => {
      this.data.reservationId = reservationId;
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
