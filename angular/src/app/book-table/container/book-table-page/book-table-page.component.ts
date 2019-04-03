import { Component, OnInit } from '@angular/core';
import * as fromBookTable from '../../store/reducers/book-table.reducer';
import {select, Store} from '@ngrx/store';
import {BookTable, BookTableActionTypes} from '../../store/actions/book-table.actions';
import {Booking} from '../../models/booking';
import {Observable} from 'rxjs';

@Component({
  selector: 'public-book-table',
  templateUrl: './book-table-page.component.html',
  styleUrls: ['./book-table-page.component.scss'],
})
export class BookTablePageComponent implements OnInit {
  booking$: Observable<Booking>;

  constructor (
    private store: Store<fromBookTable.State>
  ) {
    this.booking$ = this.store.pipe(select(fromBookTable.getBookedTable));
  }

  ngOnInit(): void {
  }

  onBookTableSubmit(booking: Booking) {
    this.store.dispatch(new BookTable({booking}));
  }

  onInviteFriendsSubmit(booking: Booking) {
    this.store.dispatch(new BookTable({booking}));
  }
}
