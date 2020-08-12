import { createReducer, on, Action } from '@ngrx/store';
import * as bookTableActions from '../actions/book-table.actions';
import { BookingResponse } from '../../models/booking-response.model';
import { Booking } from '../../models/booking.model';

export interface State {
  pending: boolean;
  errorMessage: string | null;
  textMessage: string | null;
  booking: Booking | null;
  token: string | null;
  bookingResponse: BookingResponse | null;
}

export const initialState: State = {
  pending: false,
  errorMessage: '',
  textMessage: '',
  booking: undefined,
  token: undefined,
  bookingResponse: {
    name: '',
    bookingDate: '',
    bookingToken: '',
    tableId: undefined,
    email: '',
  },
};

const bookTableReducer = createReducer(
  initialState,
  on(bookTableActions.bookTable, (state, { booking }) => ({
    ...state,
    pending: true,
    booking,
  })),
  on(bookTableActions.bookTableSuccess, (state, { bookingResponse }) => ({
    ...state,
    pending: false,
    bookingResponse,
  })),
  on(bookTableActions.bookTableFail, (state, { error }) => ({
    ...state,
    pending: false,
    errorMessage: error.message,
  })),
  on(bookTableActions.inviteFriends, (state, { booking }) => ({
    ...state,
    pending: true,
    booking,
  })),
  on(bookTableActions.inviteFriendsSuccess, (state, { bookingResponse }) => ({
    ...state,
    pending: false,
    bookingResponse,
  })),
  on(bookTableActions.inviteFriendsFail, (state, { error }) => ({
    ...state,
    pending: false,
    errorMessage: error.message,
  })),
);

export function reducer(state: State | undefined, action: Action): State {
  return bookTableReducer(state, action);
}
