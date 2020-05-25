import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { IIngredient } from '../ingredient.interface';

@Entity({ name: 'Ingredient' })
export class Ingredient extends BaseEntity implements IIngredient {
  @Column('varchar', { length: 255 })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  name?: string;

  @Column('varchar', { length: 4000 })
  @IsString()
  @MaxLength(4000)
  @IsOptional()
  description?: string;

  @Column('decimal', { precision: 16, scale: 10 })
  @IsNumber()
  @IsOptional()
  @Transform(value => Number(value))
  price?: number;
}
