import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, State} from '../reducers/order.reducer';

export const getOrderState = createFeatureSelector<State>('order')

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getOrderState);


export const selectEntity = createSelector(
  getOrderState,
  selectIds
);

export const getTotalPrice = createSelector(
  selectAll,
  (state) => {
    let totalPrice = 0;
    state.map(price => totalPrice = totalPrice + (price.order.dish.price * price.order.orderLine.amount));
    return totalPrice;
  }
);
