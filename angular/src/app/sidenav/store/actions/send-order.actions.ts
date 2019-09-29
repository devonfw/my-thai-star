import { props, createAction, union } from '@ngrx/store';

export const sendOrders = createAction(
  '[SendOrder] Load SendOrders',
  props<{ token: string }>(),
);

export const sendOrdersSuccess = createAction(
  '[SendOrder] Load SendOrders Success',
);

export const sendOrdersFail = createAction(
  '[SendOrder] Load SendOrders Fail',
  props<{ error: string }>(),
);

// action types
const all = union({
  sendOrders,
  sendOrdersSuccess,
  sendOrdersFail,
});
export type SendOrdersAction = typeof all;
