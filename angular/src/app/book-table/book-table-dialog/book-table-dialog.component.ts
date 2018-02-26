import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookTableService } from '../shared/book-table.service';
import { SnackBarService } from '../../core/snackService/snackService.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

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
               public translateService: TranslateService,
               private dialog: MatDialogRef<BookTableDialogComponent>,
               @Inject(MAT_DIALOG_DATA) dialogData: any) {
                 this.data = dialogData;
  }

  ngOnInit(): void {
    this.date = moment(this.data.bookingDate).format('LLL');
  }

  sendBooking (): void {
    this.bookingService.postBooking(this.bookingService.composeBooking(this.data, 0)).subscribe( () => {
      this.translateService.get('bookTable.dialog.bookingSuccess').subscribe( (text: string) => {
        this.snackBar.openSnack(text, 4000, 'green');
      });
    }, (error: any) => {
      this.translateService.get('bookTable.dialog.bookingError').subscribe((text: string) => {
        this.snackBar.openSnack(text, 4000, 'red');
      });
    });
    this.dialog.close(true);
  }

}
