import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import * as fromBookTable from '../../store/reducers/book-table.reducer';
import {Store} from '@ngrx/store';
import {BookTable} from '../../store/actions/book-table.actions';
import {Order} from '../../../menu/models/order.model';

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
     private store: Store<fromBookTable.State>,
     @Inject(MAT_DIALOG_DATA) dialogData: any
  ) {
       this.data = dialogData;
  }

  ngOnInit(): void {
    this.date = moment(this.data.bookingDate).format('LLL');
  }

  sendBooking (): void {
    this.store.dispatch(new BookTable({booking: this.data}));
    this.dialog.close(true);
  }
}
