import { IPageable, ISort } from '../pageable.interface';
import { IsInt, IsString, IsNotEmpty, IsOptional, ValidateNested, Matches } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class Sort implements ISort {
  @IsString()
  @IsNotEmpty()
  readonly property!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/ASC|DESC/)
  @Transform((value?: string) => value && value.toUpperCase())
  @ApiProperty({ enum: ['ASC', 'DESC'] })
  readonly direction!: 'ASC' | 'DESC';
}

export class Pageable implements IPageable {
  @IsInt()
  @IsNotEmpty()
  readonly pageSize!: number;

  @IsNotEmpty()
  readonly pageNumber!: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => Sort)
  @ApiProperty({ type: [Sort] })
  readonly sort?: Sort[];
}
