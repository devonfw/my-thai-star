import {AuthActions, AuthActionTypes} from '../actions/auth.actions';
import {User} from '../../models/user';
import {createSelector} from '@ngrx/store';
import {getAuthState} from './index';

const localStorageUser: User = JSON.parse(localStorage.getItem('user'));

export interface State {
  isLoggedIn: boolean;
  errorMessage: string | null;
  textMessage: string | null;
  userData: User | null;
  token: string | null;
}

export const initialState: State = {
  isLoggedIn: false,
  errorMessage: undefined,
  textMessage: undefined,
  userData: {
    user: (localStorageUser !== null) ? localStorageUser.user : '',
    currentRole: (localStorageUser !== null) ? localStorageUser.currentRole : 'CUSTOMER',
    logged: (localStorageUser !== null) ? localStorageUser.logged : false
  },
  token: null,
};

export function reducer(
  state = initialState,
  action: AuthActions
): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {...state, isLoggedIn: false};

    case AuthActionTypes.LOGIN_SUCCESS:
      return {...state, isLoggedIn: true, userData: action.payload.userData};

    case AuthActionTypes.LOGIN_FAIL:
      return {...state, isLoggedIn: false, errorMessage: 'Incorrect username / password.'};

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

export const getUserData: any = (state: State) => state.isLoggedIn;
