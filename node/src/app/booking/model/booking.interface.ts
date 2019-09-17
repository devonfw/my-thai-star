import { IBaseEntity } from '../../shared/model/base-entity.interface';
export interface IBooking extends IBaseEntity {
  userId?: number;
  name: string;
  bookingToken?: string;
  comment?: string;
  email: string;
  bookingDate: Date;
  expirationDate?: Date;
  creationDate?: Date;
  canceled?: boolean;
  bookingType?: number;
  tableId?: number;
  orderId?: number;
  assistants?: number;
}
