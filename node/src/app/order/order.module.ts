import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingModule } from '../booking/booking.module';
import { OrderController } from './controllers/order.controller';
import { OrderLine } from './model/entities/order-line.entity';
import { OrderRepository } from './repositories/order.repository';
import { OrderService } from './services/order.service';
import { CreateOrderUseCase } from './services/use-cases/create-order.use-case';
import { DeleteOrderUseCase } from './services/use-cases/delete-order.use-case';
import { OrderMailerUseCase } from './services/use-cases/order-mailer.use-case';

@Module({
  controllers: [OrderController],
  providers: [OrderService, CreateOrderUseCase, DeleteOrderUseCase, OrderMailerUseCase],
  imports: [TypeOrmModule.forFeature([OrderLine, OrderRepository]), BookingModule],
})
export class OrderModule {}
