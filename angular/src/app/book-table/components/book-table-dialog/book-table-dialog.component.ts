import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'public-book-table-dialog',
  templateUrl: './book-table-dialog.component.html',
  styleUrls: ['./book-table-dialog.component.scss'],
})
export class BookTableDialogComponent implements OnInit {
  data: any;
  date: string;

  constructor (
     private dialog: MatDialogRef<BookTableDialogComponent>,
     @Inject(MAT_DIALOG_DATA) dialogData: any) {
       this.data = dialogData;
  }

  ngOnInit(): void {
    this.date = moment(this.data.bookingDate).format('LLL');
  }

  sendBooking (): void {
    this.dialog.close();
  }
}
