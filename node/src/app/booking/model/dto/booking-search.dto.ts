import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Pageable } from '../../../shared/model/dto/pageable.dto';

export class BookingSearch {
  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  readonly bookingToken?: string;

  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  readonly email?: string;

  @ApiModelProperty()
  @ValidateNested()
  @Type(() => Pageable)
  readonly pageable!: Pageable;
}
