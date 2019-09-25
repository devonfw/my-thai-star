import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrders from '../reducers/order.reducer';

export const selectOrderState = createFeatureSelector<fromOrders.State>(
  'order',
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = fromOrders.adapter.getSelectors(selectOrderState);

export const getTotalPrice = createSelector(
  selectAll,
  (state) => {
    let totalPrice = 0;
    state.map(
      (order) =>
        (totalPrice =
          totalPrice +
          order.details.dish.price * order.details.orderLine.amount),
    );
    return totalPrice;
  },
);
