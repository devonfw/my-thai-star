import { plainToClass } from 'class-transformer';
import { newBookingSample } from '../../../../migration/__fixture__/booking/bookings.fixture';
import { invitedGuestsSample } from '../../../../migration/__fixture__/booking/invites-guests.fixture';
import { User } from '../../../core/user/model/entities/user.entity';
import { InvalidBookingException } from '../../exceptions/invalid-booking.exception';
import { NoFreeTablesException } from '../../exceptions/no-free-tables.exception';
import { BookingTypes } from '../../model/booking-types';
import { Booking } from '../../model/entities/booking.entity';
import { InvitedGuest } from '../../model/entities/invited-guest.entity';
import { CreateBookingUseCase } from './create-booking.use-case';

describe('CreateBookingUseCase', () => {
  let uc: CreateBookingUseCase;

  beforeAll(async () => {
    uc = new CreateBookingUseCase(
      {
        transaction: (callback: any): any => {
          const entityManager = {
            getCustomRepository: (): any => ({
              save: (value: any): any =>
                new Promise(resolve => {
                  resolve(value);
                }),
            }),
          };

          return callback(entityManager);
        },
      } as any,
      {
        getFreeTable: jest.fn().mockReturnValueOnce(undefined).mockReturnValue(1),
      } as any,
    );
  });

  it('should be defined', () => {
    expect(uc).toBeDefined();
  });

  describe('createBooking', () => {
    describe('without invitedGuests', () => {
      it('should throw an error if there is no free table', () => {
        return expect(uc.createBooking(newBookingSample as Booking)).rejects.toThrow(NoFreeTablesException);
      });
      it('should save the new booking if there is no errors', () => {
        return expect(
          uc.createBooking(newBookingSample as Booking, undefined, { id: 1 } as User),
        ).resolves.toStrictEqual(
          plainToClass(Booking, {
            ...Booking.create(newBookingSample),
            userId: 1,
            tableId: 1,
            creationDate: expect.anything(),
          }),
        );
      });
    });
    describe('with invitedGuests', () => {
      it('should throw an error if you are trying to create a invalid booking', () => {
        return expect(
          uc.createBooking(newBookingSample as Booking, invitedGuestsSample, { id: 1 } as User),
        ).rejects.toThrow(InvalidBookingException);
      });
      it('should save the new booking and the invitedGuests if without throwing any error', () => {
        const result = plainToClass(Booking, {
          ...Booking.create(newBookingSample),
          userId: 1,
          bookingType: BookingTypes.INVITED,
          creationDate: expect.anything(),
        });
        result.invitedGuests = invitedGuestsSample.map(inv => {
          const invited = InvitedGuest.create(inv);
          invited.modificationDate = expect.anything();
          invited.bookingId = newBookingSample.id!;
          return invited;
        });
        return expect(
          uc.createBooking({ ...newBookingSample, bookingType: BookingTypes.INVITED } as Booking, invitedGuestsSample, {
            id: 1,
          } as User),
        ).resolves.toStrictEqual(result);
      });
    });
  });
});
