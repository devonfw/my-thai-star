
export class Booking {
  id: string;
  booking: ReservationInfo;
  invitedGuests?: {
    [index: number]: { email: string },
  };
}

export class ReservationInfo {
  bookingDate: string;
  name: string;
  email: string;
  bookingType: number;
  assistants?: number;
}
