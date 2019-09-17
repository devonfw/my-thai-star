import { IBaseEntity } from '../../shared/model/base-entity.interface';

export interface ICategory extends IBaseEntity {
  name?: string;
  description?: string;
  showOrder?: number;
}
