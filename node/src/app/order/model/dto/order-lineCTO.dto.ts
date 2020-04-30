import { classToPlain, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Dish } from '../../../dish/model/entities/dish.entity';
import { Ingredient } from '../../../dish/model/entities/ingredient.entity';
import { OrderLine } from '../entities/order-line.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderLineCTO {
  @Type(() => OrderLine)
  @ValidateNested()
  @ApiProperty({ type: () => OrderLine })
  readonly orderLine!: OrderLine;

  @Type(() => Dish)
  @ValidateNested()
  @ApiPropertyOptional({ type: () => Dish })
  readonly dish?: Dish;

  @Type(() => Ingredient)
  @ValidateNested()
  @ApiPropertyOptional({ type: () => [Ingredient] })
  readonly extras?: Ingredient[];

  static fromOrderLine(orderLine: OrderLine): OrderLineCTO {
    if (!orderLine) {
      return orderLine;
    }
    return {
      orderLine: orderLine && (classToPlain(orderLine, { excludeExtraneousValues: true }) as OrderLine),
      dish: orderLine.dish && (classToPlain(orderLine.dish) as Dish),
      extras: orderLine.ingredients ? (classToPlain(orderLine.ingredients) as Ingredient[]) : [],
    };
  }
}
