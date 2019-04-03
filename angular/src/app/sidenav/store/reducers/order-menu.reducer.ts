import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OrderMenu } from '../../model/order-menu.model';
import { OrderMenuActions, OrderMenuActionTypes } from '../actions/order-menu.actions';

export interface State extends EntityState<OrderMenu> {
  // additional entities state properties
}

export const adapter: EntityAdapter<OrderMenu> = createEntityAdapter<OrderMenu>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: OrderMenuActions
): State {
  switch (action.type) {
    case OrderMenuActionTypes.AddOrderMenu: {
      return adapter.addOne(action.payload.orderMenu, state);
    }

    case OrderMenuActionTypes.UpsertOrderMenu: {
      return adapter.upsertOne(action.payload.orderMenu, state);
    }

    case OrderMenuActionTypes.AddOrderMenus: {
      return adapter.addMany(action.payload.orderMenus, state);
    }

    case OrderMenuActionTypes.UpsertOrderMenus: {
      return adapter.upsertMany(action.payload.orderMenus, state);
    }

    case OrderMenuActionTypes.UpdateOrderMenu: {
      return adapter.updateOne(action.payload.orderMenu, state);
    }

    case OrderMenuActionTypes.UpdateOrderMenus: {
      return adapter.updateMany(action.payload.orderMenus, state);
    }

    case OrderMenuActionTypes.DeleteOrderMenu: {
      return adapter.removeOne(action.payload.id, state);
    }

    case OrderMenuActionTypes.DeleteOrderMenus: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case OrderMenuActionTypes.LoadOrderMenus: {
      return adapter.addAll(action.payload.orderMenus, state);
    }

    case OrderMenuActionTypes.ClearOrderMenus: {
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
