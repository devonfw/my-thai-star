import { Action } from '@ngrx/store';
import {TokenString, UserDataResponse} from '../../models/user';

export enum AuthActionTypes {
  OPEN_DIALOG = '[Auth] Open Dialog',
  CLOSE_DIALOG = '[Auth] Close Dialog',
  LOGIN = '[Auth] Login ',
  LOGIN_SUCCESS = '[Auth] LoginSuccess',
  LOGIN_FAIL = '[Auth] LoginFail',
  LOGOUT = '[Auth] Logout ',
  LOGOUT_FAIL = '[Auth] LogoutFail',
  TOKEN = '[Auth] Token',
  VERIFY_TWO_FACTOR = '[Auth] VerifyTwoFactor',
}

export class OpenDialog implements Action {
  readonly type = AuthActionTypes.OPEN_DIALOG;
}

export class CloseDialog implements Action {
  readonly type = AuthActionTypes.CLOSE_DIALOG;
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: {username: string, password: string}) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: { user: UserDataResponse }) {}
}

export class Token implements Action {
  readonly type = AuthActionTypes.TOKEN;
  constructor(public payload: { token: TokenString }) {}
}

export class LoginFail implements Action {
  readonly type = AuthActionTypes.LOGIN_FAIL;
  constructor(public payload: { error: Error }) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LogoutFail implements Action {
  readonly type = AuthActionTypes.LOGOUT_FAIL;
  constructor(public payload: { error: Error }) {}
}

export class VerifyTwoFactor implements Action {
  readonly type = AuthActionTypes.VERIFY_TWO_FACTOR;
  constructor(public payload: {username: string, password: string}) {}
}


export type AuthActions =
  | OpenDialog
  | CloseDialog
  | Login
  | LoginSuccess
  | LoginFail
  | Logout
  | LogoutFail
  | Token
  | VerifyTwoFactor;
