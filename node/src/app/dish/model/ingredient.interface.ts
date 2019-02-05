import { IBaseEntity } from '../../shared/model/base-entity.interface';

export interface IIngredient extends IBaseEntity {
  name?: string;
  description?: string;
  price?: number;
}
