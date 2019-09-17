import { props, createAction } from '@ngrx/store';

export const sendOrders = createAction('[SendOrder] Load SendOrders', props<{token: string}>());

export const sendOrdersSuccess = createAction('[SendOrder] Load SendOrders Success');

export const sendOrdersFail = createAction('[SendOrder] Load SendOrders Fail', props<{error: string}>());
