import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {BookTableActions, BookTableActionTypes} from '../actions/book-table.actions';
import {Booking} from '../../models/booking.model';
import {createSelector} from '@ngrx/store';


export interface State extends EntityState<Booking> {
  selectedBookingId: number | null;
}

export function selectBookingId(a: Booking): string {
  return a.id;
}

export const adapter: EntityAdapter<Booking> = createEntityAdapter<Booking>({
  selectId: selectBookingId
});


const initialState: State = adapter.getInitialState({
  selectedBookingId: 0
});

// export interface State {
//   pending: boolean;
//   errorMessage: string | null;
//   textMessage: string | null;
//   bookingInfo: BookingInfo;
// }
//
// export const initialState: State = {
//   pending: false,
//   errorMessage: null,
//   textMessage: null,
//   bookingInfo: undefined
// };

export function reducer(
  state = initialState,
  action: BookTableActions
): State {
  switch (action.type) {
    case BookTableActionTypes.BOOK_TABLE:
      return adapter.addOne(action.payload.booking, state);

    case BookTableActionTypes.LOAD_BOOKED_TABLES:
      return adapter.addAll(action.payload.bookings, state);

    case BookTableActionTypes.SELECT_BOOKED_TABLE:
      return {...state, selectedBookingId: action.payload};

    default:
      return state;
  }
}

export const getSelectedBookingId = (state: State) => state.selectedBookingId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of user ids
export const selectBookingIds = selectIds;

// select the dictionary of user entities
export const selectBookingEntities = selectEntities;

// select the array of users
export const selectAllBookings = selectAll;

// select the total user count
export const selectBookingTotal = selectTotal;
