import { InvitedGuest } from '../../../src/app/booking/model/entities/invited-guest.entity';

export const invitedGuestSample: InvitedGuest = {
  id: 7,
  modificationCounter: 1,
  bookingId: 3,
  guestToken: 'GB_20170510_62350266501Z',
  email: 'guest6@mail.com',
  accepted: false,
  modificationDate: new Date(),
};

export const newInvitedGuestSample: Array<Partial<InvitedGuest>> = [
  {
    bookingId: 3,
    email: 'guest6@mail.com',
  },
  {
    bookingId: 3,
    email: 'guest7@mail.com',
  },
];
