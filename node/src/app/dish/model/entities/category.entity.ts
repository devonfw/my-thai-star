import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { ICategory } from '../category.interface';

@Entity({ name: 'Category' })
export class Category extends BaseEntity implements ICategory {
  @Column('varchar', { length: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @Column('varchar', { length: 4000 })
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;

  @Column('integer')
  @IsInt()
  @IsOptional()
  showOrder?: number;
}
