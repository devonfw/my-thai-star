import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

export class BookingServiceMock {}
describe('Booking Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [{ provide: BookingService, useClass: BookingServiceMock }],
    }).compile();
  });
  it('should be defined', () => {
    const controller: BookingController = module.get<BookingController>(
      BookingController,
    );
    expect(controller).toBeDefined();
  });
});
