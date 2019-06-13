import { Action } from '@ngrx/store';

export enum BookTableActionTypes {
  BOOK_TABLE = '[BookTable] Book table',
  BOOK_TABLE_SUCCESS = '[BookTable] Book table success',
  BOOK_TABLE_FAIL = '[BookTable] Book table Fail',
  INVITE_FRIENDS = '[InviteFriends] Invite friends',
  INVITE_FRIENDS_SUCCESS = '[InviteFriends] Invite friends success',
  INVITE_FRIENDS_FAIL = '[InviteFriends] Invite friends Fail',
}

export class BookTable implements Action {
  readonly type = BookTableActionTypes.BOOK_TABLE;

  constructor(public payload: any) {}
}

export class BookTableSuccess implements Action {
  readonly type = BookTableActionTypes.BOOK_TABLE_SUCCESS;

  constructor(public payload: any) {}
}

export class BookTableFail implements Action {
  readonly type = BookTableActionTypes.BOOK_TABLE_FAIL;

  constructor(public payload: any) {}
}

export class InviteFriends implements Action {
  readonly type = BookTableActionTypes.INVITE_FRIENDS;

  constructor(public payload: any) {}
}

export class InviteFriendsSuccess implements Action {
  readonly type = BookTableActionTypes.INVITE_FRIENDS_SUCCESS;

  constructor(public payload: any) {}
}

export class InviteFriendsFail implements Action {
  readonly type = BookTableActionTypes.INVITE_FRIENDS_FAIL;

  constructor(public payload: any) {}
}

export type BookTableActions =
  BookTable
  | BookTableSuccess
  | BookTableFail
  | InviteFriends
  | InviteFriendsSuccess
  | InviteFriendsFail;
