import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './models/booking.entity';
import { Repository } from 'typeorm';
import { UserService } from './../../management/user/user.service';
import { UserServiceMock } from '../../../test/mocks/user.service.mock';
import { EmailService } from '../../shared/email/email.service';

describe('BookingService', () => {
  let service: BookingService;
  beforeAll(async () => {
    const mockRepository = new Repository<Booking>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: getRepositoryToken(Booking),
          useValue: mockRepository,
        },
        {
          provide: UserService,
          useClass: UserServiceMock,
        },
        { provide: EmailService, useValue: new EmailService() },
      ],
    }).compile();
    service = module.get<BookingService>(BookingService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
