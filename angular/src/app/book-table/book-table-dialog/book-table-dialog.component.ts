import { BookTableService } from '../../shared/services/book-table.service';
import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-book-table-dialog',
  templateUrl: './book-table-dialog.component.html',
  styleUrls: ['./book-table-dialog.component.scss']
})
export class BookTableDialogComponent implements OnInit {

  data: any = {
    date: "",
    time: "",
    name: "",
    email: "",
    adults: 0,
    kids: 0
  };

  constructor (
    private dialog: MdDialogRef<BookTableDialogComponent>,
    private service: BookTableService
  ) {
    this.data = dialog.config.data;
    this.data.date = moment(dialog.config.data.dateTime, moment.ISO_8601).format('L');
    this.data.time = moment(dialog.config.data.dateTime, moment.ISO_8601).format('LT');
  }

  ngOnInit() { }

  sendBooking (): void {
    this.service.sendBooking({"data": "to_be_sent"}).subscribe(data => {
      console.log(data.dishes)
    })
  }
}
