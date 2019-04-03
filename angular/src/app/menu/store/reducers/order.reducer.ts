import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Order } from '../../models/order.model';
import { OrderActions, OrderActionTypes } from '../actions/order.actions';

export interface State extends EntityState<Order> {
  selectedOrderId: string | null;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (order: Order) => order.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedOrderId: null
});

export function reducer(
  state = initialState,
  action: OrderActions
): State {
  switch (action.type) {
    case OrderActionTypes.AddOrder: {
      return adapter.addOne(action.payload.order, state);
    }

    case OrderActionTypes.UpsertOrder: {
      return adapter.upsertOne(action.payload.order, state);
    }

    case OrderActionTypes.AddOrders: {
      return adapter.addMany(action.payload.orders, state);
    }

    case OrderActionTypes.UpsertOrders: {
      return adapter.upsertMany(action.payload.orders, state);
    }

    case OrderActionTypes.UpdateOrder: {
      return adapter.updateOne(action.payload.order, state);
    }

    case OrderActionTypes.UpdateOrders: {
      return adapter.updateMany(action.payload.orders, state);
    }

    case OrderActionTypes.DeleteOrder: {
      return adapter.removeOne(action.payload.id, state);
    }

    case OrderActionTypes.DeleteOrders: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case OrderActionTypes.LoadOrders: {
      return adapter.addAll(action.payload.orders, state);
    }

    case OrderActionTypes.ClearOrders: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
