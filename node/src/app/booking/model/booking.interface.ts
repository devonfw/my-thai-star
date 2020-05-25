export interface IBooking {
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
