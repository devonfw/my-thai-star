import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { classToPlain } from 'class-transformer';
import { User } from '../../user/model/entity/user.entity';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<User | undefined> {
    const user = await this.usersService.findOne(username);
    if (user && compare(pass, user.password!)) {
      return classToPlain(user) as User;
    }
    return undefined;
  }

  async login(user: User) {
    const payload = await this.validateUser(user.username!, user.password!);

    if (!payload) {
      return new UnauthorizedException('Wrong username or password');
    }

    return this.jwtService.sign(payload);
  }
}
