import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BookTableDialogService } from './shared/book-table-dialog.service';

@Component({
  selector: 'app-book-table-dialog',
  templateUrl: './book-table-dialog.component.html',
  styleUrls: ['./book-table-dialog.component.scss']
})
export class BookTableDialogComponent implements OnInit {

  data: any;

  constructor (private bookingService: BookTableDialogService, private dialog: MdDialogRef<BookTableDialogComponent>) {
    this.data = dialog.config.data;

  }

  ngOnInit(): void {
    this.data = this.dialog.config.data;
    this.data.date = moment(this.dialog.config.data.dateTime).format('DD/MM/YYYY');
    this.data.time = moment(this.dialog.config.data.dateTime).format('LT');
    this.bookingService.getTableId().subscribe( (data) => {
      this.data.tableId = data.tableId;
    });
  }

  sendBooking (): void {
    alert('booking sended');
    this.dialog.close();
  }

}
