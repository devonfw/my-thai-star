import { Action } from '@ngrx/store';
import {Booking} from '../../models/booking.model';
import { Update } from '@ngrx/entity';

export enum BookTableActionTypes {
  BOOK_TABLE = '[BookTable] Book table',
  BOOK_TABLE_SUCCESS = '[BookTable] Book table success',
  DELETE_BOOKED_TABLE = '[BookTable] Delete booked table',
  DELETE_BOOKED_TABLE_SUCCESS = '[BookTable] Delete booked table success',
  LOAD_BOOKED_TABLES = '[BookTable] Load booked tables',
  LOAD_BOOKED_TABLES_SUCCESS = '[BookTable] Load booked tables success',
  SELECT_BOOKED_TABLE = '[BookTable] Clear booked tables',
}

export class LoadBookedTables implements Action {
  readonly type = BookTableActionTypes.LOAD_BOOKED_TABLES;

  constructor(public payload: {bookings: Booking[]}) {}
}

export class BookTable implements Action {
  readonly type = BookTableActionTypes.BOOK_TABLE;

  constructor(public payload: {booking: Booking}) {}
}

export class BookTableSuccess implements Action {
  readonly type = BookTableActionTypes.BOOK_TABLE_SUCCESS;

  constructor(public payload: Booking) {}
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
  readonly type = BookTableActionTypes.LOAD_BOOKED_TABLES_SUCCESS;
}

export class SelectBookedTable implements Action {
  readonly type = BookTableActionTypes.SELECT_BOOKED_TABLE;

  constructor(public payload: any) {}
}



export type BookTableActions =
  BookTable
  | BookTableSuccess
  | DeleteBookedTable
  | DeleteBookedTableSucccess
  | LoadBookedTables
  | LoadBookedTablesSuccess
  | SelectBookedTable;
