import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromBookings from 'app/book-table/store/reducers/book-table.reducer';
import {BookTable, LoadBookedTables, LoadBookedTablesSuccess} from '../../store/actions/book-table.actions';
import {Booking} from '../../models/booking.model';
import {Observable} from 'rxjs';
import * as fromBooking from 'app/book-table/store/reducers';
import {selectAllBookings} from 'app/book-table/store/reducers';


@Component({
  selector: 'book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnInit {
  bookTableState$: Observable<Booking[]>;
  booking: Booking;
  constructor(
    private store: Store<fromBooking.State>
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadBookedTablesSuccess());
    const tables$ = this.store.pipe(
      select(selectAllBookings)
    );
  }

  onBookTableSubmit(booking: Booking): void {
    this.store.dispatch(new BookTable({booking: booking}));
  }
}
