import { Transform } from 'class-transformer';
import { UserRole } from '../entities/user-role.entity';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserPayload implements Pick<User, 'id' | 'username' | 'email'> {
  id!: number;
  username!: string;
  email!: string;
  @Transform(value => value.name)
  @ApiProperty({ type: 'string' })
  role!: Pick<UserRole, 'name'>;
}
