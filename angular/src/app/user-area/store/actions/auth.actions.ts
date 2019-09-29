import { props, createAction, union } from '@ngrx/store';
import { TokenString, UserDataResponse } from '../../models/user';

export const openDialog = createAction('[Auth] Open Dialog');

export const closeDialog = createAction('[Auth] Close Dialog');

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>(),
);

export const loginSuccess = createAction(
  '[Auth] LoginSuccess',
  props<{ user: UserDataResponse }>(),
);

export const token = createAction(
  '[Auth] Token',
  props<{ token: TokenString }>(),
);

export const loginFail = createAction(
  '[Auth] LoginFail',
  props<{ error: Error }>(),
);

export const logout = createAction('[Auth] Logout');

export const logoutFail = createAction(
  '[Auth] LogoutFail',
  props<{ error: Error }>(),
);

export const verifyTwoFactor = createAction(
  '[Auth] VerifyTwoFactor',
  props<{ username: string; password: string }>(),
);

// action types
const all = union({
  openDialog,
  closeDialog,
  login,
  loginSuccess,
  loginFail,
  token,
  logout,
  logoutFail,
  verifyTwoFactor,
});
export type AuthActions = typeof all;
