import { IBaseEntity } from '../../shared/model/base-entity.interface';

export interface IOrderLine extends IBaseEntity {
  dishId: number;
  amount?: number;
  comment?: string;
  orderId?: number;
}
