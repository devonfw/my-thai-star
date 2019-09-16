import { Dish } from '../entities/dish.entity';
import { Image } from '../../../image/model/entities/image.entity';
import { Category } from '../entities/category.entity';
import { Ingredient } from '../entities/ingredient.entity';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export class DishCTO {
  @Type(() => Dish)
  @ValidateNested()
  readonly dish!: Dish;

  @Type(() => Image)
  @ValidateNested()
  readonly image!: Image;

  @Type(() => Category)
  @ValidateNested()
  readonly categories?: Category[];

  @Type(() => Ingredient)
  @ValidateNested()
  readonly extras?: Ingredient[];
}
