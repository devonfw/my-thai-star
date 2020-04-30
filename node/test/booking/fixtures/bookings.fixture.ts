import { Booking } from '../../../src/app/booking/model/entities/booking.entity';

export const bookingSample: Booking = {
  id: 3,
  modificationCounter: 1,
  name: 'user2',
  bookingToken: 'CB_20170510_123502595Z',
  comment: 'Booking Type GSR',
  email: 'user2@mail.com',
  bookingDate: new Date(),
  expirationDate: new Date(),
  creationDate: new Date(),
  canceled: false,
  bookingType: 0,
  assistants: 5,
};
