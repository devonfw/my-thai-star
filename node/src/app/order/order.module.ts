import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLine } from './model/entities/order-line.entity';
import { Order } from './model/entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { BookingModule } from '../booking/booking.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderLine]), BookingModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
