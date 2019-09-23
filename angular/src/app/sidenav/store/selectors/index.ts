import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, State } from '../reducers/order.reducer';

export const selectOrderState = createFeatureSelector<State>('order');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectOrderState);

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
