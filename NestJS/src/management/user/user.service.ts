import {
  Injectable,
  forwardRef,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../../shared/base.service';
import { RegisterVm } from './models/view-models/register-vm.model';
import { genSalt, hash, compare } from 'bcryptjs';
import { LoginVm } from './models/view-models/login-vm.model';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { AuthService } from '../../shared/auth/auth.service';
import { JwtPayload } from '../../shared/auth/jwt-payload';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService)) readonly _authService: AuthService,
  ) {
    super();
    this._repository = _userRepository;
  }

  async register(registerVm: RegisterVm): Promise<User> {
    const { username, password, email } = registerVm;
    try {
      let exist = await this._userRepository.findOne({ username });
      if (exist) {
        throw new HttpException(
          `${username} is already in use`,
          HttpStatus.BAD_REQUEST,
        );
      }

      exist = await this._userRepository.findOne({ email });
      if (exist) {
        throw new HttpException(
          `This mail is already associated with an username`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const newUser = this._userRepository.create(registerVm);
      const salt = await genSalt();
      newUser.password = await hash(password, salt);
      const result = await this._userRepository.save(newUser);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async login(loginVm: LoginVm): Promise<LoginResponseVm> {
    try {
      const { username } = loginVm;
      const user = await this._userRepository.findOne({ username });
      if (!user) {
        throw new HttpException('name not found', HttpStatus.BAD_REQUEST);
      }

      if (!(await this.passwordMatch(loginVm.password, user.password))) {
        throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
      }

      const payload: JwtPayload = {
        name: user.username,
        role: user.role,
      };

      const authToken = await this._authService.signPayload(payload);
      return { token: authToken, name: user.username, role: user.role };
    } catch (error) {
      throw error;
    }
  }

  async passwordMatch(input: string, password: string): Promise<boolean> {
    return await compare(input, password);
  }

  async find(filter = {}): Promise<User> {
    return await this._userRepository.findOne(filter).catch(err => {
      return null;
    });
  }

  async getUserId(input = {}): Promise<number> {
    const exists = await this.find(input);
    if (exists) return exists.id;
    return -1;
  }
}
