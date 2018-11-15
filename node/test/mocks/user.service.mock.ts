import { User } from '../../src/management/user/models/user.entity';
import { BaseService } from '../../src/shared/base.service';
import { RegisterVm } from '../../src/management/user/models/view-models/register-vm.model';
import { LoginVm } from '../../src/management/user/models/view-models/login-vm.model';
import { LoginResponseVm } from '../../src/management/user/models/view-models/login-response-vm.model';
import { UserVm } from '../../src/management/user/models/view-models/user-vm.model';
import { UserRepository } from '../../src/management/user/user.repository';

export class UserServiceMock extends BaseService<User> {
  constructor() {
    super();
    this._repository = new UserRepository();
  }

  async register(registerVm: RegisterVm): Promise<User> {
    const result: User = {
      id: 1,
      username: registerVm.username,
      email: registerVm.email,
      password: registerVm.password,
      role: 'Customer',
      createdAt: new Date(),
      updatedAt: new Date(),
      favourites: [],
      bookings: [],
      hasId: () => true,
      save: () => null,
      remove: () => null,
      reload: null,
    };
    return result;
  }

  async login(loginVm: LoginVm): Promise<LoginResponseVm> {
    const usermock: UserVm = {
      username: loginVm.username,
      email: 'mail@test.com',
    };
    const result: LoginResponseVm = { name: 'name', role: 'CUSTOMER' };
    return result;
  }

  async passwordMatch(input: string, password: string): Promise<boolean> {
    return input === password;
  }

  async find(filter = {}): Promise<User> {
    const result: User = {
      id: 1,
      username: 'test',
      email: 'test@mail.com',
      password: 'test',
      role: 'Customer',
      favourites: [],
      bookings: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      hasId: () => true,
      save: () => null,
      remove: () => null,
      reload: null,
    };
    return result;
  }

  async findById(id: number): Promise<User> {
    const result: User = {
      id: 1,
      username: 'test',
      email: 'test@mail.com',
      password: 'test',
      role: 'Customer',
      favourites: [],
      bookings: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      hasId: () => true,
      save: () => null,
      remove: () => null,
      reload: null,
    };
    if (id === 1) return result;
  }
}
