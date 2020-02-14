import { Order } from '../../../app/order/model/entities/order.entity';

export const ordersSample: Order[] = [
  { id: 1, modificationCounter: 1, bookingId: 1, hostId: 1 },
  { id: 2, modificationCounter: 1, bookingId: 4, invitedGuestId: 1 },
  { id: 3, modificationCounter: 1, bookingId: 4, invitedGuestId: 2 },
  { id: 4, modificationCounter: 1, bookingId: 4, invitedGuestId: 3 },
  { id: 5, modificationCounter: 1, bookingId: 4, invitedGuestId: 4 },
  { id: 6, modificationCounter: 1, bookingId: 4, invitedGuestId: 5 },
  { id: 7, modificationCounter: 1, bookingId: 4, invitedGuestId: 9 },
  { id: 8, modificationCounter: 1, bookingId: 4, invitedGuestId: 10 },
];
