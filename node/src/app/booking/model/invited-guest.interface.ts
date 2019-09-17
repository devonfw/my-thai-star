import { IBaseEntity } from '../../shared/model/base-entity.interface';

export interface IInvitedGuest extends IBaseEntity {
  bookingId: number;
  guestToken?: string;
  email?: string;
  accepted?: boolean;
  modificationDate?: Date;
  orderId?: number;
}
