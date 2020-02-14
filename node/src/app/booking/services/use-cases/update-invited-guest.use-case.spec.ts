import { bookingsSample } from '../../../../migration/__fixture__/booking/bookings.fixture';
import { invitedGuestsSample } from '../../../../migration/__fixture__/booking/invites-guests.fixture';
import { InvalidTokenException } from '../../../shared/exceptions/invalid-token.exception';
import { AlreadyAcceptedException } from '../../exceptions/already-accepted.exception';
import { InvalidCancelationTimeException } from '../../exceptions/invalid-cancelation-time.exception';
import { UpdateInvitedGuestUseCase } from './update-invited-guest.use-case';

describe('UpdateInvitedGuestUseCase', () => {
  let uc: UpdateInvitedGuestUseCase;

  beforeAll(async () => {
    uc = new UpdateInvitedGuestUseCase(
      {
        save: (value: any): any => new Promise(resolve => resolve(value)),
        findOne: jest
          .fn()
          .mockResolvedValueOnce(undefined)
          .mockResolvedValueOnce({ ...invitedGuestsSample[1], booking: bookingsSample[3] })
          .mockResolvedValueOnce({
            ...invitedGuestsSample[1],
            booking: { ...bookingsSample[3], bookingDate: new Date() },
            accepted: undefined,
          })
          .mockResolvedValueOnce({
            ...invitedGuestsSample[1],
            booking: { ...bookingsSample[3], expirationDate: new Date() },
            accepted: undefined,
          })
          .mockResolvedValue({
            ...invitedGuestsSample[1],
            booking: bookingsSample[3],
            accepted: undefined,
          }),
        getAcceptedAssistantsByBookingToken: jest.fn().mockResolvedValue(2),
      } as any,
      {
        getFreeTable: jest.fn().mockReturnValueOnce(undefined).mockReturnValue(1),
      } as any,
      { save: (value: any): any => new Promise(resolve => resolve(value)) } as any,
    );
  });

  it('should be defined', () => {
    expect(uc).toBeDefined();
  });

  describe('updateInvitedGuest', () => {
    it('should throw an error if the guestToken do not match with any registered guestToken', () => {
      return expect(uc.updateInvitedGuest('123', true)).rejects.toThrowError(InvalidTokenException);
    });
    it('should throw an error if the guest already accept (or cancel) the invitation', () => {
      return expect(uc.updateInvitedGuest('123', true)).rejects.toThrowError(AlreadyAcceptedException);
    });
    it('should throw an error if the guest already accept (or cancel) the invitation', () => {
      return expect(uc.updateInvitedGuest('123', true)).rejects.toThrowError(InvalidCancelationTimeException);
    });
    it('should change the guest status and get a booking table if is after expiration time', () => {
      return expect(uc.updateInvitedGuest('123', true)).resolves.toBeUndefined();
    });
    it('should change the guest status', () => {
      return expect(uc.updateInvitedGuest('123', true)).resolves.toBeUndefined();
    });
  });
});
