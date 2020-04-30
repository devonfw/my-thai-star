process.env.NODE_ENV = 'test';

import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { bookingsSample } from '../../../migration/__fixture__/booking/bookings.fixture';
import { CoreModule } from '../../core/core.module';
import { User } from '../../core/user/model/entities/user.entity';
import { InvalidTokenException } from '../../shared/exceptions/invalid-token.exception';
import { BookingModule } from '../booking.module';
import { AlreadyAcceptedException } from '../exceptions/already-accepted.exception';
import { InvalidCancelationTimeException } from '../exceptions/invalid-cancelation-time.exception';
import { BookingTypes } from '../model/booking-types';
import { BookingSearch } from '../model/dto/booking-search.dto';
import { NewBooking } from '../model/dto/new-booking.dto';
import { Booking } from '../model/entities/booking.entity';
import { InvitedGuest } from '../model/entities/invited-guest.entity';
import { BookingController } from './booking.controller';

jest.setTimeout(10000);

describe('BookingController', () => {
  let controller: BookingController;
  let bookingRepository: Repository<Booking>;
  let bookingToken: string;
  let invitedGuestToken1: string;
  let invitedGuestToken2: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, BookingModule],
      controllers: [],
      providers: [],
    }).compile();
    await module.init();
    controller = module.get<BookingController>(BookingController);
    bookingRepository = module.get<Repository<Booking>>('BookingRepository');
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('bookingRepository should be defined', () => {
    expect(bookingRepository).toBeDefined();
  });

  describe('register', () => {
    it('should register a new common booking', async () => {
      const newBooking: NewBooking = {
        booking: {
          bookingDate: new Date('2025-02-21T23:47:43.000Z'),
          name: 'Ramon Garcia',
          email: 'ramon-garcia@eltiodelacapa.es',
          assistants: 4,
        } as Booking,
      };

      const response = await controller.register(newBooking, { id: 1 } as User);
      expect(response).toBeInstanceOf(Booking);
      expect(response.assistants).toStrictEqual(4);
      expect(response.bookingDate).toBeDefined();
      expect(response.bookingDate).toBeInstanceOf(Date);
      expect(response.bookingDate).toStrictEqual(newBooking.booking.bookingDate);
      expect(response.bookingToken).toBeDefined();
      expect(response.bookingToken).toMatch(/CB_/);
      expect(response.bookingType).toStrictEqual(BookingTypes.COMMON);
      expect(response.canceled).toBeDefined();
      expect(response.canceled).toBeFalsy();
      expect(response.comment).toStrictEqual(null);
      expect(response.creationDate).toBeDefined();
      expect(response.creationDate).toBeInstanceOf(Date);
      expect(response.email).toStrictEqual('ramon-garcia@eltiodelacapa.es');
      expect(response.expirationDate).toBeDefined();
      expect(response.expirationDate).toBeInstanceOf(Date);
      expect(response.id).toStrictEqual(6);
      expect(response.name).toStrictEqual('Ramon Garcia');
      expect(response.orderId).toStrictEqual(null);
      expect(response.tableId).toStrictEqual(1);
      expect(response.userId).toStrictEqual(1);
    });

    it('should register a new invited guest booking', async () => {
      const newBooking: NewBooking = {
        booking: {
          bookingDate: new Date('2025-02-21T23:47:43.000Z'),
          name: 'Ramon Garcia',
          email: 'ramon-garcia-2@eltiodelacapa.es',
          bookingType: BookingTypes.INVITED,
        } as Booking,
        invitedGuests: [
          {
            email: 'que-apostamos@tve.es',
          } as InvitedGuest,
          {
            email: 'grand-prix@tve.es',
          } as InvitedGuest,
        ],
      };

      const response = await controller.register(newBooking, { id: 1 } as User);
      bookingToken = response.bookingToken!;
      invitedGuestToken1 = response.invitedGuests![0].guestToken!;
      invitedGuestToken2 = response.invitedGuests![1].guestToken!;
      expect(response).toBeInstanceOf(Booking);
      expect(response.invitedGuests?.length).toStrictEqual(2);
      expect(response.invitedGuests![0].accepted).toStrictEqual(null);
      expect(response.invitedGuests![0].email).toStrictEqual('que-apostamos@tve.es');
      expect(response.invitedGuests![0].guestToken).toMatch(/GB_/);
      expect(response.invitedGuests![0].id).toStrictEqual(11);
      expect(response.invitedGuests![0].orderId).toStrictEqual(null);
      expect(response.invitedGuests![1].accepted).toStrictEqual(null);
      expect(response.invitedGuests![1].email).toStrictEqual('grand-prix@tve.es');
      expect(response.invitedGuests![1].guestToken).toMatch(/GB_/);
      expect(response.invitedGuests![1].id).toStrictEqual(12);
      expect(response.invitedGuests![1].orderId).toStrictEqual(null);
    });
  });

  describe('searchBooking', () => {
    it('should return all bookings if no filter is entered.', async () => {
      const bookingSearch: BookingSearch = {
        pageable: {
          pageNumber: 0,
          pageSize: 100,
        },
      };

      const searchResult = await controller.searchBooking(bookingSearch);
      expect(searchResult.totalElements).toStrictEqual(7);
      expect(searchResult.pageable.pageNumber).toStrictEqual(0);
      expect(searchResult.pageable.pageSize).toStrictEqual(100);
      expect(searchResult.pageable.sort).toBeUndefined();
      expect(searchResult.content.length).toStrictEqual(7);
      expect(searchResult.content[6].booking.name).toStrictEqual('Ramon Garcia');
    });

    it('should paginate', async () => {
      const bookingSearch: BookingSearch = {
        pageable: {
          pageNumber: 0,
          pageSize: 5,
        },
      };

      const searchResult = await controller.searchBooking(bookingSearch);
      expect(searchResult.totalElements).toStrictEqual(7);
      expect(searchResult.pageable.pageNumber).toStrictEqual(0);
      expect(searchResult.pageable.pageSize).toStrictEqual(5);
      expect(searchResult.pageable.sort).toBeUndefined();
      expect(searchResult.content.length).toStrictEqual(5);
    });

    it('should sort the elements', async () => {
      const bookingSearch: BookingSearch = {
        pageable: {
          pageNumber: 0,
          pageSize: 5,
          sort: [
            {
              direction: 'DESC',
              property: 'email',
            },
          ],
        },
      };

      const searchResult = await controller.searchBooking(bookingSearch);
      expect(searchResult.totalElements).toStrictEqual(7);
      expect(searchResult.pageable.pageNumber).toStrictEqual(0);
      expect(searchResult.pageable.pageSize).toStrictEqual(5);
      expect(searchResult.pageable.sort).toBeDefined();
      expect(searchResult.content.length).toStrictEqual(5);
      expect(
        searchResult.content.reduce((prev, curr, idx) => {
          if (idx === 0) {
            return prev;
          }
          return prev && curr.booking.email <= searchResult.content[idx - 1].booking.email;
        }, true),
      ).toStrictEqual(true);
    });

    it('should filter by bookingToken', async () => {
      const bookingSearch: BookingSearch = {
        pageable: {
          pageNumber: 0,
          pageSize: 100,
        },
        bookingToken: bookingsSample[0].bookingToken,
      };

      const searchResult = await controller.searchBooking(bookingSearch);
      expect(searchResult.totalElements).toStrictEqual(1);
      expect(searchResult.pageable.pageNumber).toStrictEqual(0);
      expect(searchResult.pageable.pageSize).toStrictEqual(100);
      expect(searchResult.pageable.sort).toBeUndefined();
      expect(searchResult.content.length).toStrictEqual(1);
      expect(searchResult.content[0].booking.bookingToken).toStrictEqual(bookingsSample[0].bookingToken);
    });

    it('should filter by email', async () => {
      const bookingSearch: BookingSearch = {
        pageable: {
          pageNumber: 0,
          pageSize: 100,
        },
        email: 'ramon-garcia@eltiodelacapa.es',
      };

      const searchResult = await controller.searchBooking(bookingSearch);
      expect(searchResult.totalElements).toStrictEqual(1);
      expect(searchResult.pageable.pageNumber).toStrictEqual(0);
      expect(searchResult.pageable.pageSize).toStrictEqual(100);
      expect(searchResult.pageable.sort).toBeUndefined();
      expect(searchResult.content.length).toStrictEqual(1);
      expect(searchResult.content[0].booking.email).toStrictEqual('ramon-garcia@eltiodelacapa.es');
    });

    it('should return an empty array if no elements match wit the filter', async () => {
      const bookingSearch: BookingSearch = {
        pageable: {
          pageNumber: 0,
          pageSize: 100,
        },
        email: 'chuck-norris@god.com',
      };

      const searchResult = await controller.searchBooking(bookingSearch);
      expect(searchResult.totalElements).toStrictEqual(0);
      expect(searchResult.pageable.pageNumber).toStrictEqual(0);
      expect(searchResult.pageable.pageSize).toStrictEqual(100);
      expect(searchResult.pageable.sort).toBeUndefined();
      expect(searchResult.content.length).toStrictEqual(0);
    });
  });
  describe('acceptInvitedGuest', () => {
    it('should return an error if current date is greater than expirationDate', async () => {
      const booking: Booking = (await bookingRepository.findOne({ where: { bookingToken } })) as Booking;
      const prevDate = booking.bookingDate;
      booking.bookingDate = new Date();
      await bookingRepository.save(booking);

      await expect(controller.acceptInvitedGuest(invitedGuestToken1)).rejects.toThrowError(
        InvalidCancelationTimeException,
      );
      booking.bookingDate = prevDate;
      await bookingRepository.save(booking);
    });
    it('should accept an invited guest', async () => {
      const response = await controller.acceptInvitedGuest(invitedGuestToken1);

      expect(response).toBeUndefined();
    });
    it('should return an error if the guestToken is invalid', () => {
      return expect(controller.acceptInvitedGuest('FAKETOKEN')).rejects.toThrowError(InvalidTokenException);
    });
    it('should return an error if the guest was already accepted/declined', () => {
      return expect(controller.acceptInvitedGuest(invitedGuestToken1)).rejects.toThrowError(AlreadyAcceptedException);
    });
  });
  describe('declineInvitedGuest', () => {
    it('should return an error if current date is greater than expirationDate', async () => {
      const booking: Booking = (await bookingRepository.findOne({ where: { bookingToken } })) as Booking;
      const prevDate = booking.bookingDate;
      booking.bookingDate = new Date();
      await bookingRepository.save(booking);

      await expect(controller.declineInvitedGuest(invitedGuestToken2)).rejects.toThrowError(
        InvalidCancelationTimeException,
      );
      booking.bookingDate = prevDate;
      await bookingRepository.save(booking);
    });
    it('should decline an invited guest', async () => {
      const response = await controller.declineInvitedGuest(invitedGuestToken2);

      expect(response).toBeUndefined();
    });
    it('should return an error if the guestToken is invalid', () => {
      return expect(controller.declineInvitedGuest('FAKETOKEN')).rejects.toThrowError(InvalidTokenException);
    });
    it('should return an error if the guest was already accepted/declined', () => {
      return expect(controller.declineInvitedGuest(invitedGuestToken2)).rejects.toThrowError(AlreadyAcceptedException);
    });
  });
  describe('cancelBooking', () => {
    it('should cancel a booking', async () => {
      const booking = await bookingRepository.findOne({ where: { email: 'ramon-garcia@eltiodelacapa.es' } });

      await expect(controller.cancelBooking(booking?.bookingToken!)).resolves.toBeUndefined();
    });
  });
});
