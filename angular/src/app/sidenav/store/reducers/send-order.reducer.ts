import * as sendOrderActions from '../actions/send-order.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  token: string;
  orderSent: boolean;
  error: string;
}

export const initialState: State = {
  token: '',
  orderSent: false,
  error: ''
};

const sendOrderReducer = createReducer(
  initialState,
  on(sendOrderActions.sendOrders, (state, {token}) => ({...state, token: token})),
  on(sendOrderActions.sendOrdersSuccess, state => ({...state, orderSent: true})),
  on(sendOrderActions.sendOrdersFail, (state, {error}) => ({...state, error: error['error']['message']}))
);

export function reducer(state: State | undefined, action: Action) {
  return sendOrderReducer(state, action);
}
