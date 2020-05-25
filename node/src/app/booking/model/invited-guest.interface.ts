export interface IInvitedGuest {
  bookingId: number;
  guestToken?: string;
  email?: string;
  accepted?: boolean;
  modificationDate?: Date;
  orderId?: number;
}
