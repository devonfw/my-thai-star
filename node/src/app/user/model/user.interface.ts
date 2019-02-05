import { IBaseEntity } from '../../../app/shared/model/base-entity.interface';

export interface IUser extends IBaseEntity {
  username?: string;
  password?: string;
  secret?: string;
  twoFactorStatus?: boolean;
  email?: string;
  roleId: number;
}
