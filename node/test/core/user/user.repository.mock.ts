import * as _ from 'lodash';
import { FindConditions, FindOneOptions, DeepPartial } from 'typeorm';
import { User } from '../../../src/app/core/user/model/entities/user.entity';
import { roles } from '../../../src/app/core/auth/model/roles.enum';

export class UserRepositoryMock {
  users: Array<DeepPartial<User>>;
  constructor() {
    this.users = [
      {
        id: 1,
        username: 'user1',
        // password: 'user1',
        password: '$2b$12$KgUSTFUTjRqQD7U7tuV9quheR4L.LOAT.GhmTjBIXsgLMhBXjfhYq',
        role: {
          id: roles.Customer,
          name: roles[roles.Customer].toUpperCase(),
        },
      },
      {
        id: 2,
        username: 'user2',
        // password: 'user2',
        password: '$2b$12$jDy/bJV0p6mYRlEjZL5t0OX9jinlfEiQDfuApJJGSVW6Ca/hiVbBW',
        role: {
          id: roles.Waiter,
          name: roles[roles.Waiter].toUpperCase(),
        },
      },
    ];
  }

  // async to mantain the same return type as UserService
  async findOne(options: FindOneOptions<User> | undefined): Promise<DeepPartial<User> | undefined> {
    return _.find(this.users, {
      username: (options!.where! as FindConditions<User>).username as string,
    });
  }

  async save(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }
}
