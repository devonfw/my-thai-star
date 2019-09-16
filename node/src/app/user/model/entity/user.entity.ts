import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { IUser } from '../user.interface';
import { UserRole } from './user-role.entity';

@Entity({ name: 'Users' })
@Exclude()
export class User extends BaseEntity implements IUser {
  @Column('varchar', { length: 255, nullable: true })
  @Expose()
  @ApiModelPropertyOptional()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  username?: string;

  @Column('varchar', { length: 255, nullable: true })
  @ApiModelPropertyOptional()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  password?: string;

  @Column('varchar', { length: 255, nullable: true })
  @ApiModelPropertyOptional()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  secret?: string;

  @Column('boolean', { nullable: true })
  @Transform(value => Boolean(value))
  @ApiModelPropertyOptional()
  @IsBoolean()
  @IsOptional()
  twoFactorStatus?: boolean;

  @Column('varchar', { length: 255, nullable: true })
  @Expose()
  @ApiModelPropertyOptional()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  email?: string;

  @Column('bigint', { name: 'idRole', nullable: false })
  @ApiModelPropertyOptional()
  @IsInt()
  roleId!: number;

  @ManyToOne(_type => UserRole, userRole => userRole.id)
  @Expose()
  @JoinColumn({
    name: 'idRole',
  })
  @Transform(value => (value ? value.name.toUpperCase() : undefined), {
    toPlainOnly: true,
  })
  @Type(() => UserRole)
  role?: UserRole;
}
