import { Dish } from '../entities/dish.entity';
import { Image } from '../../../image/model/entities/image.entity';
import { Category } from '../entities/category.entity';
import { Ingredient } from '../entities/ingredient.entity';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
export class DishCTO {
  @Type(() => Dish)
  @ValidateNested()
  @ApiProperty({ type: () => Dish })
  readonly dish!: Dish;

  @Type(() => Image)
  @ValidateNested()
  readonly image!: Image;

  @Type(() => Category)
  @ValidateNested()
  @ApiPropertyOptional({ type: () => [Category] })
  readonly categories?: Category[];

  @Type(() => Ingredient)
  @ValidateNested()
  @ApiPropertyOptional({ type: () => [Ingredient] })
  readonly extras?: Ingredient[];
}
