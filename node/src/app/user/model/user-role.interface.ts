import { IBaseEntity } from '../../shared/model/base-entity.interface';

export interface IUserRole extends IBaseEntity {
  name?: string;
  active?: boolean;
}
