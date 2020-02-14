import { ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { IUser } from '../user.interface';
import { UserRole } from './user-role.entity';

@Entity({ name: 'Users' })
@Exclude()
export class User extends BaseEntity implements IUser {
  @Column('varchar', { length: 255, nullable: true })
  @Expose()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  username?: string;

  @Column('varchar', { length: 255, nullable: true })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  password?: string;

  @Column('varchar', { length: 255, nullable: true })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  secret?: string;

  @Column('boolean', { nullable: true })
  @Transform(value => Boolean(value))
  @IsBoolean()
  @IsOptional()
  twoFactorStatus?: boolean;

  @Column('varchar', { length: 255, nullable: true })
  @Expose()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  email?: string;

  @Column('bigint', { name: 'idRole', nullable: false })
  @IsInt()
  roleId!: number;

  @Expose()
  @ManyToOne(
    () => UserRole,
    userRole => userRole.id,
  )
  @JoinColumn({
    name: 'idRole',
  })
  @Transform(value => (value ? value.name.toUpperCase() : undefined), {
    toPlainOnly: true,
  })
  @Type(() => UserRole)
  @ApiPropertyOptional({ type: () => UserRole })
  role?: UserRole;
}
