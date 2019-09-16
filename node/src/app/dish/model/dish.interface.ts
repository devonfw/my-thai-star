import { IBaseEntity } from '../../shared/model/base-entity.interface';

export interface IDish extends IBaseEntity {
  name?: string;
  description?: string;
  price?: number;
  imageId: number;
}
