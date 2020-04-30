import { DeepPartial } from 'typeorm';
import { InvalidUserException } from '../../../src/app/core/auth/exceptions/invalid-user.exception';
import { roles } from '../../../src/app/core/auth/model/roles.enum';
import { User } from '../../../src/app/core/user/model/entities/user.entity';
import { UserAlreadyExsitsException } from '../../../src/app/core/user/exceptions/user-already-exists.exception';

export class AuthServiceMock {
  private user: DeepPartial<User> = {
    id: 1,
    username: 'user1',
    password: 'user1',
    role: {
      id: roles.Customer,
      name: roles[roles.Customer].toUpperCase(),
    },
  };

  async validateUser(username: string, pass: string): Promise<User | undefined> {
    if (username === this.user.username && pass === this.user.password) {
      return this.user as User;
    }

    return undefined;
  }

  async login(user: User): Promise<string> {
    if (!(await this.validateUser(user.username!, user.password!))) {
      throw new InvalidUserException();
    }

    return 'THISISNOTAJWTTOKEN';
  }

  register(user: User): Partial<User> {
    if (user.username === this.user.username) {
      throw new UserAlreadyExsitsException();
    }

    return { ...user, roleId: roles.Customer };
  }
}
