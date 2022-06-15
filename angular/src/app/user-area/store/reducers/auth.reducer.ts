import { Action, createReducer, on } from '@ngrx/store';
import { TokenString, UserDataResponse } from '../../models/user';
import * as authActions from '../actions/auth.actions';

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
    token: '',
  },
};

const authReducer = createReducer(
  initialState,
  on(authActions.login, (state) => ({ ...state })),
  on(authActions.loginSuccess, (state, { user }) => ({ ...state, user })),
  on(authActions.token, (state, { token }) => ({ ...state, token })),
  on(authActions.loginFail, (state, { error }) => ({
    ...state,
    error: error.message,
  })),
  on(authActions.register, (state) => ({ ...state })),
  on(authActions.registerSuccess, (state, { username }) => ({ ...state, user: { user: username, ...state.user } })),
  on(authActions.registerFail, (state, { error }) => ({
    ...state,
    error: error.error.message,
  })),
  on(authActions.logout, (state) => ({ ...initialState })),
  on(authActions.logoutFail, (state) => ({
    ...state,
    error: 'Something went wrong !!!!.',
  })),
);

export function reducer(
  state: AuthState | undefined,
  action: Action,
): AuthState {
  return authReducer(state, action);
}
