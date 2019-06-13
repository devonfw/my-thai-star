import {AuthActions, AuthActionTypes} from '../actions/auth.actions';
import {LoginInfo} from '../../../shared/backend-models/interfaces';
import {TokenString, UserDataResponse} from '../../models/user';

export interface AuthState {
  error: string | null;
  text: string | null;
  user: UserDataResponse | null;
  token: TokenString | null;
}

export const initialState: AuthState = {
  error: null,
  text: null,
  user: {
    user: '',
    role: 'CUSTOMER',
    logged: false,
  },
  token: {
    token: ''
  },
};

export function reducer(
  state: AuthState = initialState,
  action: AuthActions,
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state};
    case AuthActionTypes.LOGIN_SUCCESS:
      return { ...state, user: action.payload.user };
    case AuthActionTypes.TOKEN:
      return { ...state, token: action.payload.token };
    case AuthActionTypes.LOGIN_FAIL:
      return { ...state, error: 'Incorrect username and/or password.' };
    case AuthActionTypes.LOGOUT:
      return initialState;
    case AuthActionTypes.LOGOUT_FAIL:
      return { ...state, error: 'Something went wrong !!!!.'};
    default:
      return state;
  }
}
