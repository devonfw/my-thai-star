import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { classToPlain } from 'class-transformer';
import { User } from '../../user/model/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { InvalidUserException } from '../exceptions/invalid-user.exception';
import { LoginDTO } from '../model/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<User | undefined> {
    const user = await this.usersService.findOne(username);
    if (user && (await compare(pass, user.password!))) {
      return classToPlain(user) as User;
    }
    return undefined;
  }

  async login(user: LoginDTO): Promise<string> {
    const payload = await this.validateUser(user.username!, user.password!);

    if (!payload) {
      throw new InvalidUserException();
    }

    return this.jwtService.sign(payload);
  }

  register(user: Partial<User>): Promise<User> {
    return this.usersService.registerUser(user);
  }
}
