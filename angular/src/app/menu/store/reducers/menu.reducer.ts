
import { MenuActions, MenuActionTypes } from '../actions/menu.actions';
import {DishView} from '../../../shared/view-models/interfaces';

export interface MenuState {
  loading: boolean;
  loaded: boolean;
  dishes: DishView[];
  errorMessage: string;
}

export const initialState: MenuState = {
  loading: false,
  loaded: false,
  dishes: [],
  errorMessage: '',
};

export function reducer(state = initialState, action: MenuActions): MenuState {

  switch (action.type) {
    case MenuActionTypes.LOAD_MENUS: {
      return {
        ...state,
        loading: true,
        loaded: false,
        dishes: []
      };
    }

    case MenuActionTypes.LOAD_MENUS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        dishes: action.payload.content
      };
    }

    case MenuActionTypes.LOAD_MENUS_FAIL: {
      return {
        ...state,
        errorMessage: action.payload
      };
    }

    default:
      return state;
  }
}
