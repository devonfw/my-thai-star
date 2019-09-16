import { IPage } from '../page.interface';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsInt, ValidateNested } from 'class-validator';
import { Pageable } from './pageable.dto';

export class Page<T> implements IPage<T> {
  @ApiModelProperty()
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  readonly content!: T[];

  @ApiModelProperty()
  @IsNotEmpty()
  @ValidateNested()
  readonly pageable!: Pageable;

  @ApiModelProperty()
  @IsInt()
  @IsNotEmpty()
  readonly totalElements!: number;
}
