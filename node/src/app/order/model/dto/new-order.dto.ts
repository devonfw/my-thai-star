import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmpty } from 'class-validator';
import { OrderLineCTO } from './order-lineCTO.dto';
import { ApiProperty } from '@nestjs/swagger';

export class NewOrder {
  @Type(() => OrderLineCTO)
  @ValidateNested()
  @ApiProperty({ type: () => [OrderLineCTO] })
  readonly orderLines!: OrderLineCTO[];

  @IsNotEmpty()
  readonly booking!: { bookingToken: string };
}
