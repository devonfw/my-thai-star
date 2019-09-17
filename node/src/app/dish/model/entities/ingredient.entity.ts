import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { IIngredient } from '../ingredient.interface';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

@Entity({ name: 'Ingredient' })
export class Ingredient extends BaseEntity implements IIngredient {
  @Column('varchar', { length: 255 })
  @ApiModelPropertyOptional()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  name?: string;

  @Column('varchar', { length: 4000 })
  @ApiModelPropertyOptional()
  @IsString()
  @MaxLength(4000)
  @IsOptional()
  description?: string;

  @Column('decimal', { precision: 16, scale: 10 })
  @ApiModelPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(value => Number(value))
  price?: number;
}
