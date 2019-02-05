import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './model/entity/user.entity';
import { genSalt, hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['role'],
    });
  }

  async registerUser(user: User): Promise<User> {
    const actualUser = await this.findOne(user.username!);

    if (actualUser) {
      throw new Error('User already exists');
    }

    const salt = await genSalt(12);
    const userToSave: User = {
      ...user,
      password: await hash(user.password, salt),
      roleId: 1,
    };

    return this.userRepository.save(userToSave);
  }
}
