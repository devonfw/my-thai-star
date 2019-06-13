import { Action } from '@ngrx/store';
import {TokenString, UserDataResponse} from '../../models/user';

export enum AuthActionTypes {
  OPEN_DIALOG = '[Auth] Open Dialog',
  LOGIN = '[Auth] Login ',
  LOGIN_SUCCESS = '[Auth] LoginSuccess',
  LOGIN_FAIL = '[Auth] LoginFail',
  LOGOUT = '[Auth] Logout ',
  LOGOUT_FAIL = '[Auth] LogoutFail',
  TOKEN = '[Auth] Token',
}

export class OpenDialog implements Action {
  readonly type = AuthActionTypes.OPEN_DIALOG;
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



export type AuthActions =
  | OpenDialog
  | Login
  | LoginSuccess
  | LoginFail
  | Logout
  | LogoutFail
  | Token;
