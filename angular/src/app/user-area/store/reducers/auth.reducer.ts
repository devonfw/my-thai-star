import {AuthActions, AuthActionTypes} from '../actions/auth.actions';
import {User} from '../../models/user';

export interface State {
  pending: boolean;
  errorMessage: string | null;
  textMessage: string | null;
  userData: User | null;
  token: string | null;
}

export const initialState: State = {
  pending: false,
  errorMessage: null,
  textMessage: null,
  userData: {
    user: JSON.parse(localStorage.getItem('user')).user,
    currentRole: JSON.parse(localStorage.getItem('user')).currentRole,
    logged: JSON.parse(localStorage.getItem('user')).logged
  },
  token: null,
};

export function reducer(
  state = initialState,
  action: AuthActions
): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {...state, pending: true};

    case AuthActionTypes.LOGIN_SUCCESS:
      return {...state, pending: false, userData: action.payload.userData};

    case AuthActionTypes.LOGIN_FAIL:
      return {...state, pending: false, errorMessage: 'Incorrect username / password.'};

    case AuthActionTypes.LOGOUT:
      return initialState;

    case AuthActionTypes.LOGOUT_FAIL:
      return {...state, errorMessage: 'Something went wrong!'};

    case AuthActionTypes.SET_TOKEN:
      return {...state, token: action.payload.token};

    default: {
      return state;
    }
  }
}


export const getUsers = (state: State) => state.userData;
export const getLoggedIn = (state: State) => state.userData.logged;
