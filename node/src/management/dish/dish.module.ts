import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { Dish } from './models/dish.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dish]), SharedModule],
  providers: [DishService],
  controllers: [DishController],
})
export class DishModule {}
