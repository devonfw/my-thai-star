import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishController } from './controllers/dish.controller';
import { Category } from './model/entities/category.entity';
import { Ingredient } from './model/entities/ingredient.entity';
import { DishRepository } from './repositories/dish.repository';
import { DishService } from './services/dish.service';

@Module({
  controllers: [DishController],
  providers: [DishService],
  imports: [TypeOrmModule.forFeature([Category, Ingredient, DishRepository])],
})
export class DishModule {}
