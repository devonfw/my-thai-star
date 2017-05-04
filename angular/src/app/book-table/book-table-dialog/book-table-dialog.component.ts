import { MdDialogRef, MdSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BookTableService } from '../shared/book-table.service';

@Component({
  selector: 'app-book-table-dialog',
  templateUrl: './book-table-dialog.component.html',
  styleUrls: ['./book-table-dialog.component.scss']
})
export class BookTableDialogComponent implements OnInit {

  data: any; // Remark: Missing model type

  constructor (public snackBar: MdSnackBar,
               private bookingService: BookTableService,
               private dialog: MdDialogRef<BookTableDialogComponent>) {
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
    this.bookingService.postBookingTable(this.data).subscribe( (data) => {
      this.snackBar.open('Table succesfully booked with id: ' + data.tableId, '', {
        duration: 7000,
      });
    });
    this.dialog.close(true);
  }

}
