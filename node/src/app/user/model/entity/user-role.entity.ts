import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { IUserRole } from '../user-role.interface';
import { Entity, Column } from 'typeorm';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional, IsBoolean } from 'class-validator';

@Entity({ name: 'UserRole' })
export class UserRole extends BaseEntity implements IUserRole {
  @Column('varchar', { length: 255, nullable: true })
  @ApiModelPropertyOptional()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  name?: string;

  @Column('boolean', { nullable: true })
  @ApiModelPropertyOptional()
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
