import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Order } from '../../models/order.model';
import * as orderActions from '../actions/order.actions';

export interface OrderState extends EntityState<Order> {
  selectedOrderId: string | null;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  sortComparer: false,
});

export const initialState: OrderState = adapter.getInitialState({
  selectedOrderId: null,
});

const orderReducer = createReducer(
  initialState,
  on(orderActions.addOrder, (state, { order }) => adapter.addOne(order, state)),
  on(orderActions.addOrders, (state, { orders }) =>
    adapter.addMany(orders, state),
  ),
  on(orderActions.updateOrder, (state, { order }) =>
    adapter.updateOne(order, state),
  ),
  on(orderActions.updateOrders, (state, { orders }) =>
    adapter.updateMany(orders, state),
  ),
  on(orderActions.deleteOrder, (state, { id }) => adapter.removeOne(id, state)),
  on(orderActions.deleteOrders, (state, { ids }) =>
    adapter.removeMany(ids, state),
  ),
  on(orderActions.loadOrders, (state, { orders }) =>
    adapter.setAll(orders, state),
  ),
  on(orderActions.clearOrders, (state) => adapter.removeAll(state)),
);

export function reducer(
  state: OrderState | undefined,
  action: Action,
): OrderState {
  return orderReducer(state, action);
}
