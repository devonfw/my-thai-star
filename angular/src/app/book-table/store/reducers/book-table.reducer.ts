import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {BookTableActions, BookTableActionTypes} from '../actions/book-table.actions';
import {Booking} from '../../models/booking.model';


export interface State {
  pending: boolean;
  errorMessage: string | null;
  textMessage: string | null;
  booking: Booking | null;
  token: string | null;
}

export const initialState: State = {
  pending: false,
  errorMessage: null,
  textMessage: null,
  booking: null,
  token: null,
};

export function reducer(
  state = initialState,
  action: BookTableActions
): State {
  switch (action.type) {
    case BookTableActionTypes.BOOK_TABLE:
      return {...state, pending: true};

    case BookTableActionTypes.BOOK_TABLE_SUCCESS:
      return {...state, pending: false, booking: action.payload.booking};

    case BookTableActionTypes.LOAD_BOOKED_TABLE:
      return {...state, pending: false, };

    default: {
      return state;
    }
  }
}

export const getBookedTable = (state: State) => state.booking;
