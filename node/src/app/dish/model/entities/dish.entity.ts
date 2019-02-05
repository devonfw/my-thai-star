import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Image } from '../../../image/model/entities/image.entity';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { IDish } from '../dish.interface';
import { Category } from './category.entity';
import { Ingredient } from './ingredient.entity';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsString, MaxLength, IsOptional, IsNumber } from 'class-validator';

@Entity({ name: 'Dish' })
@Exclude()
export class Dish extends BaseEntity implements IDish {
  @Column('varchar', { length: 255, nullable: true })
  @ApiModelPropertyOptional()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  @Expose()
  name?: string;

  @Column('varchar', { length: 4000, nullable: true })
  @ApiModelPropertyOptional()
  @IsString()
  @MaxLength(4000)
  @IsOptional()
  @Expose()
  description?: string;

  @Column('decimal', { precision: 16, scale: 10, nullable: true })
  @ApiModelPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Expose()
  @Transform(value => Number(value))
  price?: number;

  @Column('bigint', { name: 'idImage', nullable: false })
  @Index({ unique: true })
  @ApiModelProperty()
  @IsNumber()
  @Expose()
  imageId!: number;

  @ManyToOne(_type => Image, image => image.id)
  @JoinColumn({ name: 'idImage' })
  image!: Image;

  @ManyToMany(_type => Category)
  @JoinTable({
    name: 'DishCategory',
    joinColumn: { name: 'idDish' },
    inverseJoinColumn: { name: 'idCategory' },
  })
  categories?: Category[];

  @ManyToMany(_type => Ingredient)
  @JoinTable({
    name: 'DishIngredient',
    joinColumn: { name: 'idDish' },
    inverseJoinColumn: { name: 'idIngredient' },
  })
  ingredients?: Ingredient[];
}
