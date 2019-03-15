import {AuthActions, AuthActionTypes} from '../actions/auth.actions';
import {LoginInfo} from '../../../shared/backend-models/interfaces';
import {User} from '../../models/user';

export interface AuthState {
  pending: boolean;
  errorMessage: string | null;
  textMessage: string | null;
  userData: User | null;
  token: string | null;
}

export const initialState: AuthState = {
  pending: false,
  errorMessage: null,
  textMessage: null,
  userData: {
    user: localStorage.getItem('user'),
    currentRole: localStorage.getItem('currentRole'),
    logged: localStorage.getItem('logged') === 'true' ? true : false
  },
  token: null,
};

export function AuthReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {...state, pending: true, userData: {user: '', currentRole: 'CUSTOMER', logged: false}};

    case AuthActionTypes.LOGIN_SUCCESS:
      return {...state, pending: false, userData: action.payload.userData};

    case AuthActionTypes.LOGIN_FAIL:
      return {...state, pending: false, errorMessage: 'Incorrect username / password.'};

    case AuthActionTypes.LOGOUT:
      return initialState;

    case AuthActionTypes.LOGOUT_FAIL:
      return { ...state, errorMessage: 'Something went wrong!'};

    case AuthActionTypes.SET_TOKEN:
      return { ...state, token: action.payload.token};

    default: {
      return state;
    }
  }
}

export const getUsers = (state: AuthState) => state.userData;
export const getUsersToken = (state: AuthState) => state.token;
