import { classToPlain, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Dish } from '../../../dish/model/entities/dish.entity';
import { Ingredient } from '../../../dish/model/entities/ingredient.entity';
import { OrderLine } from '../entities/order-line.entity';

export class OrderLineCTO {
  @Type(() => OrderLine)
  @ValidateNested()
  readonly orderLine!: OrderLine;

  @Type(() => Dish)
  @ValidateNested()
  readonly dish?: Dish;

  @Type(() => Ingredient)
  @ValidateNested()
  readonly extras?: Ingredient[];

  static fromOrderLine(orderLine: OrderLine) {
    if (!orderLine) {
      return orderLine;
    }
    return {
      orderLine:
        orderLine && classToPlain(orderLine, { excludeExtraneousValues: true }),
      dish: orderLine.dish && classToPlain(orderLine.dish),
      extras: orderLine.ingredients && classToPlain(orderLine.ingredients),
    };
  }
}
