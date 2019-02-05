import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmpty } from 'class-validator';
import { OrderLineCTO } from './order-lineCTO.dto';

export class NewOrder {
  @Type(() => OrderLineCTO)
  @ValidateNested()
  readonly orderLines!: OrderLineCTO[];

  @IsNotEmpty()
  readonly booking!: { bookingToken: string };
}
