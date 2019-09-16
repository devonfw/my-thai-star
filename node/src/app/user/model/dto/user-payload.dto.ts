import { UserRole } from '../entity/user-role.entity';
import { User } from '../entity/user.entity';
import { Transform } from 'class-transformer';

export class UserPayload implements Pick<User, 'id' | 'username' | 'email'> {
  id!: number;
  username!: string;
  email!: string;
  @Transform(value => value.name)
  role!: Pick<UserRole, 'name'>;
}
