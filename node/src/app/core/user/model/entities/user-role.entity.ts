import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { IUserRole } from '../user-role.interface';

@Entity({ name: 'UserRole' })
export class UserRole extends BaseEntity implements IUserRole {
  @Column('varchar', { length: 255, nullable: true })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  name?: string;

  @Column('boolean', { nullable: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
