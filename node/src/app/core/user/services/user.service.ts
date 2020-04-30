import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../model/entities/user.entity';
import { genSalt, hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { roles } from '../../auth/model/roles.enum';
import { plainToClass } from 'class-transformer';
import { UserAlreadyExsitsException } from '../exceptions/user-already-exists.exception';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['role'],
    });
  }

  async registerUser(user: Partial<User>): Promise<User> {
    const actualUser = await this.findOne(user.username!);

    if (actualUser) {
      throw new UserAlreadyExsitsException();
    }

    const salt = await genSalt(12);
    const hashPass = await hash(user.password, salt);

    return plainToClass(
      User,
      await this.userRepository.save({
        username: user.username,
        email: user.email,
        password: hashPass,
        roleId: roles.Customer,
      }),
    );
  }
}
