import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { ContentType } from '../content-type';
import { IImage } from '../image.interface';

@Entity({ name: 'Image' })
export class Image extends BaseEntity implements IImage {
  @Column('varchar', { length: 255, nullable: true })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  name?: string;

  @Column('text', { nullable: true })
  @IsString()
  @IsOptional()
  content?: string;

  @Column('integer', { nullable: true })
  @IsOptional()
  @Transform(value => ContentType[value])
  contentType?: number;

  @Column('varchar', { length: 255, nullable: true })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  mimeType?: string;
}
