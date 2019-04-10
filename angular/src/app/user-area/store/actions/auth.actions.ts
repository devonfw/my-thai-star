import { Action } from '@ngrx/store';
import {LoginInfo} from '../../../shared/backend-models/interfaces';
import {Credentials} from '../../models/user';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAIL = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
  LOGOUT_FAIL = '[Auth] Logout Failure',
  SET_TOKEN = '[Auth] Set Token'
}

/* @export
 * @class LogInAction
 * @implements {Action}
 */
export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;

  constructor(public payload: any) {}
}

/* @export
 * @class LoginSuccess
 * @implements {Action}
 */
export class SetToken implements Action {
  readonly type = AuthActionTypes.SET_TOKEN;

  constructor(public payload: {token: string}) {}
}

/* @export
 * @class LoginSuccess
 * @implements {Action}
 */
export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: any) {}
}

/* @export
 * @class LoginFail
 * @implements {Action}
 */
export class LoginFail implements Action {
  readonly type = AuthActionTypes.LOGIN_FAIL;

  constructor(public payload: { error: any }) {}
}

/* @export
 * @class Logout
 * @implements {Action}
 */
export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

/* @export
 * @class LogoutFail
 * @implements {Action}
 */
export class LogoutFail implements Action {
  readonly type = AuthActionTypes.LOGOUT_FAIL;

  constructor(public payload: { error: any }) {}
}


export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFail
  | Logout
  | LogoutFail
  | SetToken;




