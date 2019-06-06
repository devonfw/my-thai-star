
import { BookTableActions, BookTableActionTypes } from '../actions/book-table.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: BookTableActions): State {
  switch (action.type) {

    case BookTableActionTypes.LoadBookTables:
      return state;

    default:
      return state;
  }
}
