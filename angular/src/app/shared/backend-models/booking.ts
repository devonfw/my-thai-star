// BOOKING
export class BookingInfo {
  booking: ReservationInfo;
  invitedGuests?: {
    [index: number]: { email: string },
  };
}

export class ReservationInfo {
  bookingDate: string;
  name: string;
  email: string;
  bookingType?: number;
  assistants?: number;
}

export class FriendsInvite {
  email: string;
  acceptance: string;
}

export class OrderInfo {
  orderLine: OrderLineInfo;
  extras: number[];
}

export class OrderLineInfo {
  dishId: number;
  amount: number;
  comment: string;
}

export class OrderListInfo {
  booking: { bookingToken: string };
  orderLines: OrderInfo[];
}
