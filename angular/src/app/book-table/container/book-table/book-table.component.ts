import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromBookings from 'app/book-table/store/reducers/book-table.reducer';
import {BookTable, LoadBookedTables, LoadBookedTablesSuccess} from '../../store/actions/book-table.actions';
import {Booking} from '../../models/booking.model';
import {Observable} from 'rxjs';
import * as fromApp from 'app/store/reducers';


@Component({
  selector: 'book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnInit {
  bookTableState$: Observable<Booking[]>;
  booking: Booking;
  constructor(
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
  }

  onBookTableSubmit(booking: Booking): void {
    this.store.dispatch(new BookTable(booking));
  }
}
