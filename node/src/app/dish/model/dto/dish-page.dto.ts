import { ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToClass } from 'class-transformer';
import { Image } from '../../../image/model/entities/image.entity';
import { Page } from '../../../shared/model/dto/page.dto';
import { Pageable } from '../../../shared/model/dto/pageable.dto';
import { Category } from '../entities/category.entity';
import { Dish } from '../entities/dish.entity';
import { Ingredient } from '../entities/ingredient.entity';
import { DishCTO } from './dishCTO.dto';

export class DishPage extends Page<DishCTO> {
  /**
   * Override content from Page in order to reflect the correct type to swagger.
   */
  @ApiProperty({ type: [DishCTO] })
  readonly content!: DishCTO[];

  @Exclude()
  static fromDishes(totalElements: number, pageable: Pageable, dishes: Dish[]): DishPage {
    return plainToClass(DishPage, {
      totalElements,
      pageable,
      content: dishes.map(dish => {
        return {
          dish: dish && plainToClass(Dish, dish /*{ excludeExtraneousValues: true }*/),
          image: dish.image && plainToClass(Image, dish.image),
          extras: dish.ingredients && plainToClass(Ingredient, dish.ingredients),
          categories: dish.categories && plainToClass(Category, dish.categories),
        };
      }),
    });
  }
}
