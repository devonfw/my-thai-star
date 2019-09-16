import { IPageable, ISort } from '../pageable.interface';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  Matches,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class Pageable implements IPageable {
  @ApiModelProperty()
  @IsInt()
  @IsNotEmpty()
  readonly pageSize!: number;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly pageNumber!: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => Sort)
  readonly sort?: Sort[];
}

// tslint:disable-next-line:max-classes-per-file
export class Sort implements ISort {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly property!: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/ASC|DESC/)
  @Transform((value?: string) => value && value.toUpperCase())
  readonly direction!: 'ASC' | 'DESC';
}
