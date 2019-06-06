import { Action } from '@ngrx/store';
import {Filter} from '../../../shared/backend-models/interfaces';
import {OrderSend} from '../../models/order-send.model';

export enum SendOrderActionTypes {
  SendOrders = '[SendOrder] Load SendOrders',
  SendOrdersSuccess = '[SendOrder] Load SendOrders Success',
  SendOrdersFail = '[SendOrder] Load SendOrders Fail',
}

export class SendOrders implements Action {
  readonly type = SendOrderActionTypes.SendOrders;

  constructor(public payload: {token: string}) {}
}

export class SendOrdersSuccess implements Action {
  readonly type = SendOrderActionTypes.SendOrdersSuccess;
}

export class SendOrdersFail implements Action {
  readonly type = SendOrderActionTypes.SendOrdersFail;

  constructor(public payload: {error: string}) {}
}


export type SendOrderActions =
  | SendOrders
  | SendOrdersSuccess
  | SendOrdersFail;
