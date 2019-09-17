import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Pageable } from '../../../shared/model/dto/pageable.dto';
import { Type } from 'class-transformer';
export class DishSearch {
  @ApiModelPropertyOptional()
  @IsOptional()
  readonly categories?: Array<{ id: number }>;

  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  readonly searchBy?: string;

  @ApiModelProperty()
  @ValidateNested()
  @Type(() => Pageable)
  readonly pageable!: Pageable;

  @ApiModelPropertyOptional({ type: 'number' })
  @IsInt()
  @IsOptional()
  readonly maxPrice?: number | null;

  @ApiModelPropertyOptional({ type: 'number' })
  @IsInt()
  @IsOptional()
  readonly minLikes?: number | null;
}
