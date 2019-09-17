import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Order} from '../../models/order.model';
import * as orderActions from '../actions/order.actions';

export interface State extends EntityState<Order> {
  selectedOrderId: number | null;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (order: Order) => '' + order.order.dish.id + (order.order.extras.map((e) => e.selected ? e.id : '')).join(''),
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedOrderId: null,
});

 const orderReducer = createReducer(
   initialState,
   on(orderActions.addOrder, (state, { order }) => adapter.addOne(order, state) ),
   on(orderActions.addOrders, (state, { orders }) => adapter.addMany(orders, state) ),
   on(orderActions.updateOrder, (state, { order }) => adapter.updateOne(order, state) ),
   on(orderActions.updateOrders, (state, { orders }) => adapter.updateMany(orders, state) ),
   on(orderActions.deleteOrder, (state, { id }) => adapter.removeOne(id, state) ),
   on(orderActions.deleteOrders, (state, { ids }) => adapter.removeMany(ids, state) ),
   on(orderActions.loadOrders, (state, { orders }) => adapter.addAll(orders, state) ),
   on(orderActions.clearOrders, state => adapter.removeAll(state) ),
 );

 export function reducer(state: State | undefined, action: Action) {
   return orderReducer(state, action);
 }
