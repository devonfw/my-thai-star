import { Booking } from '../../../app/booking/model/entities/booking.entity';
import { BookingTypes } from '../../../app/booking/model/booking-types';

const now = new Date();
const nowPlusFive = new Date();
const nowPlusFiveMinusOne = new Date();
nowPlusFive.setDate(nowPlusFiveMinusOne.getDate() + 5);
nowPlusFiveMinusOne.setDate(nowPlusFiveMinusOne.getDate() + 5);
nowPlusFiveMinusOne.setHours(nowPlusFiveMinusOne.getHours() - 1);

export const bookingsSample: Booking[] = [
  {
    id: 1,
    modificationCounter: 1,
    userId: 1,
    name: 'user0',
    bookingToken: 'CB_20170509_123502555Z',
    comment: 'Booking Type CSR',
    email: 'user0@mail.com',
    bookingDate: nowPlusFive,
    expirationDate: nowPlusFiveMinusOne,
    creationDate: now,
    canceled: false,
    bookingType: 0,
    tableId: 1,
    orderId: 1,
    assistants: 3,
  },
  {
    id: 2,
    modificationCounter: 1,
    userId: 1,
    name: 'user1',
    bookingToken: 'CB_20170510_123502575Z',
    comment: 'Booking Type GSR',
    email: 'user1@mail.com',
    bookingDate: nowPlusFive,
    expirationDate: nowPlusFiveMinusOne,
    creationDate: now,
    canceled: false,
    bookingType: 1,
    tableId: 2,
    orderId: 2,
  },
  {
    id: 3,
    modificationCounter: 1,
    userId: 1,
    name: 'user2',
    bookingToken: 'CB_20170510_123502595Z',
    comment: 'Booking Type GSR',
    email: 'user2@mail.com',
    bookingDate: nowPlusFive,
    expirationDate: nowPlusFiveMinusOne,
    creationDate: now,
    canceled: false,
    bookingType: 0,
    tableId: 3,
    assistants: 5,
  },
  {
    id: 4,
    modificationCounter: 1,
    userId: 1,
    name: 'host1',
    bookingToken: 'CB_20170510_123502655Z',
    comment: 'Booking Type GSR',
    email: 'host1@mail.com',
    bookingDate: nowPlusFive,
    expirationDate: nowPlusFiveMinusOne,
    creationDate: now,
    canceled: false,
    bookingType: 1,
    tableId: 4,
  },
  {
    id: 5,
    modificationCounter: 1,
    userId: 1,
    name: 'host1',
    bookingToken: 'CB_20170510_123503600Z',
    comment: 'Booking Type GSR',
    email: 'host1@mail.com',
    bookingDate: nowPlusFive,
    expirationDate: nowPlusFiveMinusOne,
    creationDate: now,
    canceled: false,
    bookingType: 1,
    tableId: 4,
  },
];

export const newBookingSample: Partial<Booking> = {
  name: 'user2',
  email: 'user2@mail.com',
  bookingDate: new Date(),
  expirationDate: new Date(),
  creationDate: new Date(),
  bookingType: BookingTypes.COMMON,
  assistants: 5,
};
