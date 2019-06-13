export interface BookingResponse {
  bookingDate: string;
  name: string;
  email: string;
  assistants?: number;
  tableId?: number;
  bookingToken?: string;
  creationDate?: string;
}
