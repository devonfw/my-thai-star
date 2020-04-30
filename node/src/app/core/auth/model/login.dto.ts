import { User } from '../../user/model/entities/user.entity';
import { IsDefined, IsString } from 'class-validator';

export class LoginDTO implements Pick<User, 'username' | 'password'> {
  @IsDefined()
  @IsString()
  username!: string;
  @IsDefined()
  @IsString()
  password!: string;
}
