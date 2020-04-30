import { Request } from 'express';

interface IUserRequest extends Request {
  user: any;
}

export type UserRequest = IUserRequest;
