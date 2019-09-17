import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { ICategory } from '../category.interface';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

@Entity({ name: 'Category' })
export class Category extends BaseEntity implements ICategory {
  @Column('varchar', { length: 255 })
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @Column('varchar', { length: 4000 })
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;

  @Column('integer')
  @ApiModelPropertyOptional()
  @IsInt()
  @IsOptional()
  showOrder?: number;
}
