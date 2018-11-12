import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './models/order.entity';
import { OrderLine } from './models/orderLine.entity';
import { Ingredient } from 'model/ingredient/ingredient.entity';
import { Dish } from 'management/dish/models/dish.entity';
import { Booking } from 'management/booking/models/booking.entity';
import { BookingService } from 'management/booking/booking.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderLine, Ingredient, Booking, Dish]),
  ],
  providers: [OrderService, BookingService],
  controllers: [OrderController],
})
export class OrderModule {}
