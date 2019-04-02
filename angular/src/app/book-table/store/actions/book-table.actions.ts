import { Action } from '@ngrx/store';
import {Booking} from '../../models/booking.model';
import { Update } from '@ngrx/entity';
import {BookingTableResponse} from '../../../shared/view-models/interfaces';

export enum BookTableActionTypes {
  BOOK_TABLE = '[BookTable] Book table',
  BOOK_TABLE_SUCCESS = '[BookTable] Book table success',
  BOOK_TABLE_RESPONSE = '[BookTable] Book table response',
  DELETE_BOOKED_TABLE = '[BookTable] Delete booked table',
  DELETE_BOOKED_TABLE_SUCCESS = '[BookTable] Delete booked table success',
  LOAD_BOOKED_TABLE = '[BookTable] Load booked tables',
  LOAD_BOOKED_TABLE_SUCCESS = '[BookTable] Load booked tables success',
  SELECT_BOOKED_TABLE = '[BookTable] Clear booked tables',
}

export class LoadBookedTables implements Action {
  readonly type = BookTableActionTypes.LOAD_BOOKED_TABLE;

  constructor(public payload: Booking) {}
}

export class BookTable implements Action {
  readonly type = BookTableActionTypes.BOOK_TABLE;

  constructor(public payload: any) {}
}

export class BookTableSuccess implements Action {
  readonly type = BookTableActionTypes.BOOK_TABLE_SUCCESS;

  constructor(public payload: {booking: Booking}) {}
}

export class BookTableResponse implements Action {
  readonly type = BookTableActionTypes.BOOK_TABLE_RESPONSE;

  constructor(public payload: {bookingTableResponse: BookingTableResponse}) {}
}

export class DeleteBookedTable implements Action {
  readonly type = BookTableActionTypes.DELETE_BOOKED_TABLE;

  constructor(public payload: Booking) {}
}

export class DeleteBookedTableSucccess implements Action {
  readonly type = BookTableActionTypes.DELETE_BOOKED_TABLE_SUCCESS;

  constructor(public payload: Booking) {}
}

export class LoadBookedTablesSuccess implements Action {
  readonly type = BookTableActionTypes.LOAD_BOOKED_TABLE_SUCCESS;
}

export class SelectBookedTable implements Action {
  readonly type = BookTableActionTypes.SELECT_BOOKED_TABLE;

  constructor(public payload: any) {}
}



export type BookTableActions =
  BookTable
  | BookTableSuccess
  | BookTableResponse
  | DeleteBookedTable
  | DeleteBookedTableSucccess
  | LoadBookedTables
  | LoadBookedTablesSuccess
  | SelectBookedTable;
