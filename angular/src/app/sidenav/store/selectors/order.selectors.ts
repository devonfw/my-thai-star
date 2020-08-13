import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromOrders from '../reducers/order.reducer';

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = fromOrders.adapter.getSelectors();

export const getOrderState = createSelector(
  fromFeature.getSideNavState,
  (state: fromFeature.SideNavState) => state.order,
);

export const getSendOrderState = createSelector(
  fromFeature.getSideNavState,
  (state: fromFeature.SideNavState) => state.orderSend,
);

export const getOrderEntities = createSelector(getOrderState, selectEntities);

export const getAllOrders = createSelector(getOrderState, selectAll);

export const getTotalPrice = createSelector(getAllOrders, (state) => {
  let totalPrice = 0;
  state.map(
    (order) =>
      (totalPrice =
        totalPrice +
        order.details.orderLine.amount *
          (order.details.dish.price +
            order.details.extras.reduce((t, e) => t + e.price, 0))),
  );
  return totalPrice;
});
