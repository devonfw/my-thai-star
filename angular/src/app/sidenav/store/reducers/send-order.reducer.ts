import * as sendOrderActions from '../actions/send-order.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface SendOrderState {
  token: string;
  orderSent: boolean;
  error: string;
}

export const initialState: SendOrderState = {
  token: '',
  orderSent: false,
  error: '',
};

const sendOrderReducer = createReducer(
  initialState,
  on(sendOrderActions.sendOrders, (state, { token }) => ({
    ...state,
    token,
  })),
  on(sendOrderActions.sendOrdersSuccess, (state) => ({
    ...state,
    orderSent: true,
  })),
  on(sendOrderActions.sendOrdersFail, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function reducer(
  state: SendOrderState | undefined,
  action: Action,
): SendOrderState {
  return sendOrderReducer(state, action);
}
