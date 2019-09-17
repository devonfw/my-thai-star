import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { Column, Entity } from 'typeorm';
import { IImage } from '../image.interface';
import { Transform } from 'class-transformer';
import { ContentType } from '../content-type';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'Image' })
export class Image extends BaseEntity implements IImage {
  @Column('varchar', { length: 255, nullable: true })
  @ApiModelPropertyOptional()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  name?: string;

  @Column('text', { nullable: true })
  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  content?: string;

  @Column('integer', { nullable: true })
  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform(value => ContentType[value])
  contentType?: number;

  @Column('varchar', { length: 255, nullable: true })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  mimeType?: string;
}
