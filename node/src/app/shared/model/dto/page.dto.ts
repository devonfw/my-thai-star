import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { IPage } from '../page.interface';
import { Pageable } from './pageable.dto';

export class Page<T> implements IPage<T> {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ApiProperty({ type: () => [Object] })
  readonly content!: T[];

  @IsNotEmpty()
  @ValidateNested()
  readonly pageable!: Pageable;

  @IsInt()
  @IsNotEmpty()
  readonly totalElements!: number;
}
