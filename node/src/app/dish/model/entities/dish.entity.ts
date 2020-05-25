import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Image } from '../../../image/model/entities/image.entity';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { IDish } from '../dish.interface';
import { Category } from './category.entity';
import { Ingredient } from './ingredient.entity';

@Entity({ name: 'Dish' })
@Exclude()
export class Dish extends BaseEntity implements IDish {
  @Column('varchar', { length: 255, nullable: true })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  @Expose()
  name?: string;

  @Column('varchar', { length: 4000, nullable: true })
  @IsString()
  @MaxLength(4000)
  @IsOptional()
  @Expose()
  description?: string;

  @Column('decimal', { precision: 16, scale: 10, nullable: true })
  @IsNumber()
  @IsOptional()
  @Expose()
  @Transform(value => Number(value))
  price?: number;

  @Column('bigint', { name: 'idImage', nullable: false })
  // @Index({ unique: true })
  @IsNumber()
  @Expose()
  imageId!: number;

  @ManyToOne(
    () => Image,
    image => image.id,
  )
  @JoinColumn({ name: 'idImage' })
  @ApiHideProperty()
  image!: Image;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'DishCategory',
    joinColumn: { name: 'idDish' },
    inverseJoinColumn: { name: 'idCategory' },
  })
  @ApiHideProperty()
  categories?: Category[];

  @ManyToMany(() => Ingredient)
  @JoinTable({
    name: 'DishIngredient',
    joinColumn: { name: 'idDish' },
    inverseJoinColumn: { name: 'idIngredient' },
  })
  @ApiHideProperty()
  ingredients?: Ingredient[];
}
