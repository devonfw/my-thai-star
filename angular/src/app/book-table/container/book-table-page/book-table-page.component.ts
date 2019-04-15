import {Component, OnInit} from '@angular/core';
import * as fromBookTable from '../../store/reducers/book-table.reducer';
import {select, Store} from '@ngrx/store';
import {BookTable} from '../../store/actions/book-table.actions';
import {Booking} from '../../models/booking';
import {Observable} from 'rxjs';

@Component({
  selector: 'public-book-table',
  templateUrl: './book-table-page.component.html',
  styleUrls: ['./book-table-page.component.scss'],
})
export class BookTablePageComponent {

  constructor (
    private store: Store<fromBookTable.State>,
  ) {}
}
