import {ActionReducerMap} from '@ngrx/store';
import * as fromBooking from './book-table.reducer';

export  interface BookTableState {
  bookings: fromBooking.State;
}

export const reducers: ActionReducerMap<BookTableState> = {
  bookings: fromBooking.reducer,
};
