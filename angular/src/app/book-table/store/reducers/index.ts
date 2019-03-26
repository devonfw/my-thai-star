import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromBooking from 'app/book-table/store/reducers/book-table.reducer';

export interface State {
  bookings: fromBooking.State;
}

export const reducers: ActionReducerMap<State> = {
  bookings: fromBooking.reducer,
};

export const selectBookingState = createFeatureSelector<fromBooking.State>('bookings');

export const selectBookingIds = createSelector(
  selectBookingState,
  fromBooking.selectBookingIds
);
export const selectBookingEntities = createSelector(
  selectBookingState,
  fromBooking.selectBookingEntities
);
export const selectAllBookings = createSelector(
  selectBookingState,
  fromBooking.selectAllBookings
);
export const selectBookingTotal = createSelector(
  selectBookingState,
  fromBooking.selectBookingTotal
);
export const selectCurrentUserId = createSelector(
  selectBookingState,
  fromBooking.getSelectedBookingId
);

export const selectCurrentBooking = createSelector(
  selectBookingEntities,
  selectCurrentUserId,
  (bookingEntities, bookingId) => bookingEntities[bookingId]
);
