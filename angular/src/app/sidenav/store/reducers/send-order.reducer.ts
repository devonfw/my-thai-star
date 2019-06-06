
import { SendOrderActions, SendOrderActionTypes } from '../actions/send-order.actions';
import {OrderSend} from '../../models/order-send.model';

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

export function reducer(state = initialState, action: SendOrderActions): State {
  switch (action.type) {

    case SendOrderActionTypes.SendOrders:
      return {...state, token: action.payload.token};

    case SendOrderActionTypes.SendOrdersSuccess:
      return {...state, orderSent: true};

    case SendOrderActionTypes.SendOrdersFail:
      return {...state, error: 'Error: Couldn\'t send order'};

    default:
      return state;
  }
}
