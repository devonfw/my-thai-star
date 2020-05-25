import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Pageable } from '../../../shared/model/dto/pageable.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArrayOfIds } from '../../../shared/validators/is-array-of-ids';

export class DishSearch {
  @IsOptional()
  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
      },
    },
  })
  @IsArrayOfIds()
  readonly categories?: Array<{ id: number }>;

  @IsString()
  @IsOptional()
  readonly searchBy?: string;

  @ValidateNested()
  @Type(() => Pageable)
  readonly pageable!: Pageable;

  @IsInt()
  @IsOptional()
  readonly maxPrice?: number;

  @IsInt()
  @IsOptional()
  readonly minLikes?: number;
}
