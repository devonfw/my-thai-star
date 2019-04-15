import {BookTableActions, BookTableActionTypes} from '../actions/book-table.actions';
import {Booking} from 'app/book-table/models/booking';
import {BookingResponse} from '../../models/booking-response';


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
    email: ''
  }
};

export function reducer(
  state = initialState,
  action: BookTableActions
): State {
  switch (action.type) {
    case BookTableActionTypes.BOOK_TABLE:
      return {...state, pending: true, booking: action.payload};

    case BookTableActionTypes.BOOK_TABLE_SUCCESS:
      return {...state, pending: false, bookingResponse: action.payload.bookingResponse};

    case BookTableActionTypes.BOOK_TABLE_FAIL:
      return {...state, pending: false, errorMessage: action.payload};

    case BookTableActionTypes.INVITE_FRIENDS:
      return {...state, pending: true, booking: action.payload};

    case BookTableActionTypes.INVITE_FRIENDS_SUCCESS:
      return {...state, pending: false, bookingResponse: action.payload.bookingResponse};

    case BookTableActionTypes.INVITE_FRIENDS_FAIL:
      return {...state, pending: false, errorMessage: action.payload};

    default: {
      return state;
    }
  }
}

export const getBookedTable = (state: State) => state.booking;
export const getBookingToken = (state: State) => state.bookingResponse.bookingToken;
