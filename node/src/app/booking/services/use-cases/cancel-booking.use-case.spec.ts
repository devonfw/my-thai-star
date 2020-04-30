import * as moment from 'moment';
import { bookingsSample } from '../../../../migration/__fixture__/booking/bookings.fixture';
import { invitedGuestsSample } from '../../../../migration/__fixture__/booking/invites-guests.fixture';
import { InvalidTokenException } from '../../../shared/exceptions/invalid-token.exception';
import { InvalidCancelationTimeException } from '../../exceptions/invalid-cancelation-time.exception';
import { Booking } from '../../model/entities/booking.entity';
import { CancelBookingUseCase } from './cancel-booking.use-case';

describe('CancelBookingUseCase', () => {
  let uc: CancelBookingUseCase;

  beforeAll(async () => {
    uc = new CancelBookingUseCase({
      findOne: jest
        .fn()
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce((): Booking | undefined => {
          const sample = { ...bookingsSample[3] };
          const date = moment().subtract(2, 'h');
          sample.expirationDate = date.toDate();
          sample.invitedGuests = invitedGuestsSample;
          return sample;
        })
        .mockImplementationOnce((): Booking | undefined => {
          const sample = { ...bookingsSample[3] };
          sample.invitedGuests = invitedGuestsSample;
          return sample;
        }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      deleteCascadeBooking: (_booking: Booking): undefined => {
        return undefined;
      },
    } as any);
  });

  it('should be defined', () => {
    expect(uc).toBeDefined();
  });

  describe('cancelBooking', () => {
    it('should return an error if a invalid token is provided', () => {
      return expect(uc.cancelBooking('123')).rejects.toThrow(InvalidTokenException);
    });
    it('should return an error if the actual time is after expiration time', () => {
      return expect(uc.cancelBooking('123')).rejects.toThrow(InvalidCancelationTimeException);
    });
    it('it should delete the booking and all invitedGuest, orders, orderLines and orderLinesExtraIngredients asociated to it', () => {
      return expect(uc.cancelBooking('123')).resolves.toBeUndefined();
    });
  });
});
