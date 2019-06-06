import { Action } from '@ngrx/store';

export enum BookTableActionTypes {
  LoadBookTables = '[BookTable] Load BookTables',
  
  
}

export class LoadBookTables implements Action {
  readonly type = BookTableActionTypes.LoadBookTables;
}


export type BookTableActions = LoadBookTables;
