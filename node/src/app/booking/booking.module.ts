import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './controllers/booking.controller';
import { BookingRepository } from './repositories/booking.repository';
import { InvitedGuestRepository } from './repositories/invited-guest.repository';
import { TableRepository } from './repositories/table.repository';
import { BookingService } from './services/booking.service';
import { BookingMailerUseCase } from './services/use-cases/booking-mailer.use-case';
import { CancelBookingUseCase } from './services/use-cases/cancel-booking.use-case';
import { CreateBookingUseCase } from './services/use-cases/create-booking.use-case';
import { GetTableUseCase } from './services/use-cases/get-table.use-case';
import { UpdateInvitedGuestUseCase } from './services/use-cases/update-invited-guest.use-case';

@Module({
  controllers: [BookingController],
  providers: [
    CreateBookingUseCase,
    UpdateInvitedGuestUseCase,
    GetTableUseCase,
    CancelBookingUseCase,
    BookingMailerUseCase,
    BookingService,
  ],
  imports: [TypeOrmModule.forFeature([InvitedGuestRepository, TableRepository, BookingRepository])],
  exports: [BookingService],
})
export class BookingModule {}
