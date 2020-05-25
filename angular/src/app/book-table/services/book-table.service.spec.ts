import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BookingInfo } from 'app/shared/backend-models/interfaces';
import { config } from '../../core/config/config';
import { ConfigService } from '../../core/config/config.service';
import { BookTableService } from './book-table.service';

describe('BookTableService', () => {
  const initialState = { config };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookTableService,
        provideMockStore({ initialState }),
        ConfigService,
      ],
      imports: [HttpClientTestingModule],
    });
  });

  it('should create', inject(
    [BookTableService],
    (service: BookTableService) => {
      expect(service).toBeTruthy();
    },
  ));

  describe('Form composer', () => {
    it('should compose correctly booking info type booking', inject(
      [BookTableService],
      (service: BookTableService) => {
        const bookingData: any = {
          assistants: 2,
          name: 'name',
          email: 'email@email.com',
          bookingDate: '2017-06-28T17:31:00.000Z',
        };

        const bookingResult: BookingInfo = {
          booking: {
            bookingDate: '2017-06-28T17:31:00.000Z',
            name: 'name',
            email: 'email@email.com',
            bookingType: 0,
            assistants: 2,
          },
        };

        expect(service.composeBooking(bookingData, 0)).toEqual(bookingResult);
      },
    ));

    it('should compose correctly booking info type reservation', inject(
      [BookTableService],
      (service: BookTableService) => {
        const reservationData: any = {
          invitedGuests: ['email@email.com', 'email2@email.com'],
          name: 'name',
          email: 'email@email.com',
          bookingDate: '2017-06-28T17:31:00.000Z',
        };

        const reservationResult: BookingInfo = {
          booking: {
            bookingDate: '2017-06-28T17:31:00.000Z',
            name: 'name',
            email: 'email@email.com',
            bookingType: 1,
          },
          invitedGuests: [
            { email: 'email@email.com' },
            { email: 'email2@email.com' },
          ],
        };

        expect(service.composeBooking(reservationData, 1)).toEqual(
          reservationResult,
        );
      },
    ));
  });
});
