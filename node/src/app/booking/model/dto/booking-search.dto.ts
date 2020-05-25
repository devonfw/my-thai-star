import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Pageable } from '../../../shared/model/dto/pageable.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BookingSearch {
  @IsString()
  @IsOptional()
  readonly bookingToken?: string;

  @IsString()
  @IsOptional()
  readonly email?: string;

  @ValidateNested()
  @Type(() => Pageable)
  @ApiProperty({ type: () => Pageable })
  readonly pageable!: Pageable;
}
