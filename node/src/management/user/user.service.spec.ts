import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserRepository } from './user.repository';
import { AuthService } from '../../shared/auth/auth.service';
import { AuthServiceMock } from '../../../test/mocks/auth.service.mock';
import { HttpException } from '@nestjs/common';
import { RegisterVm } from './models/view-models/register-vm.model';
import { LoginVm } from './models/view-models/login-vm.model';
import { ChangePasswordVm } from './models/view-models/change-password-vm.model';
import { hash } from 'bcryptjs';

describe('UserService', () => {
  let service: UserService;
  const repo = new UserRepository();
  const mocked: User = {
    id: 1,
    username: 'test',
    email: 'test@mail.com',
    password: 'test',
    role: 'User',
    favourites: [],
    bookings: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    hasId: () => true,
    save: () => null,
    remove: () => null,
    reload: null,
  };
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: repo,
        },
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
        UserService,
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*describe('register', () => {
    const input: RegisterVm = {
      mail: 'mail@mail.com',
      role: 'User',
      name: 'test',
      password: 'test',
    };
    it('should return an Error as input exists', async () => {
      jest.spyOn(repo, 'findOne').mockImplementation(() => true);
      await service
        .register(input)
        .catch(error => expect(error).toBeInstanceOf(HttpException));
    });
    it('should return the user', async () => {
      jest.spyOn(repo, 'findOne').mockImplementation(() => false);
      jest.spyOn(repo, 'create').mockImplementation(() => mocked);
      jest.spyOn(repo, 'save').mockImplementation(() => mocked);
      expect(await service.register(mocked)).toEqual(mocked);
    });
  });

  describe('login', () => {
    const login: LoginVm = {
      name: 'test',
      password: 'test',
    };
    it('should return error as user does not exist', async () => {
      jest.spyOn(repo, 'findOne').mockImplementation(() => false);
      await service
        .login(login)
        .catch(error => expect(error).toBeInstanceOf(HttpException));
    });
    it('should return the User and token', async () => {
      jest.spyOn(service, 'passwordMatch').mockImplementationOnce(() => true);
      jest.spyOn(repo, 'findOne').mockImplementation(() => mocked);
      expect(await service.login(login)).toBeDefined();
    });
    it('should return an error as passwords do not match', async () => {
      jest.spyOn(repo, 'findOne').mockImplementation(() => mocked);
      login.password = 'otherpassword';
      await service
        .login(login)
        .catch(error => expect(error).toBeInstanceOf(HttpException));
    });
  });

  describe('PasswordMatch', () => {
    it('Should return false', async () => {
      const password = await hash('!password', 10);
      expect(await service.passwordMatch('password', password)).toEqual(false);
    });
    it('Should return true', async () => {
      const password = await hash('password', 10);
      expect(await service.passwordMatch('password', password)).toEqual(true);
    });
  });*/
});
