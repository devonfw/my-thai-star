import {Component} from '@angular/core';
import * as fromBookTable from '../../store/reducers/book-table.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'public-book-table',
  templateUrl: './book-table-page.component.html',
  styleUrls: ['./book-table-page.component.scss'],
})
export class BookTablePageComponent {

  constructor () {}
}
