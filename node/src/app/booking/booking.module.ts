import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './controllers/booking.controller';
import { BookingService } from './services/booking.service';
import { Booking } from './model/entities/booking.entity';
import { InvitedGuest } from './model/entities/invited-guest.entity';
import { Table } from './model/entities/table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, InvitedGuest, Table])],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
