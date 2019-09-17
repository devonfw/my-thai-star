import { IBaseEntity } from '../../shared/model/base-entity.interface';

export interface IOrder extends IBaseEntity {
  bookingId: number;
  invitedGuestId?: number;
  hostId?: number;
}
