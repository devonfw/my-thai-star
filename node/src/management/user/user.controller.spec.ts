import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserServiceMock } from '../../../test/mocks/user.service.mock';
import { RegisterVm } from './models/view-models/register-vm.model';
import { HttpException } from '@nestjs/common';
import { LoginVm } from './models/view-models/login-vm.model';

describe('User Controller', () => {
  let module: TestingModule;
  let controller: UserController;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useClass: UserServiceMock }],
    }).compile();
  });
  it('should be defined', () => {
    controller = module.get<UserController>(UserController);
    expect(controller).toBeDefined();
  });

  /*describe('register', () => {
    it('Should return a new User', async () => {
      const input: RegisterVm = {
        name: 'test',
        password: 'test',
        mail: 'mail@test.com',
        role: 'Customer',
      };
      const result = await controller.register(input);
      expect(result.name).toEqual(input.name);
      expect(result.mail).toEqual(input.mail);
      expect(result.role).toEqual(input.role);
    });
    it('Should return a new User with name and mail to lower', async () => {
      const input: RegisterVm = {
        name: 'tEst',
        password: 'test',
        mail: 'Mail@test.com',
        role: 'Customer',
      };
      const result = await controller.register(input);
      expect(result.name).toEqual(input.name.toLowerCase());
      expect(result.mail).toEqual(input.mail.toLocaleLowerCase());
    });
    it('Should throw a missing name HttpException', async () => {
      const input: RegisterVm = {
        name: '',
        password: 'test',
        mail: 'Mail@test.com',
        role: 'User',
      };
      await controller.register(input).catch(error => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message.message).toContain('name');
      });
    });
    it('Should throw a missing password HttpException', async () => {
      const input: RegisterVm = {
        name: 'test',
        password: '',
        mail: 'Mail@test.com',
        role: 'Customer',
      };
      await controller.register(input).catch(error => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message.message).toContain('password');
      });
    });
    it('Should throw a missing mail HttpException', async () => {
      const input: RegisterVm = {
        name: 'test',
        password: 'test',
        mail: '',
        role: 'Customer',
      };
      await controller.register(input).catch(error => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message.message).toContain('mail');
      });
    });
  });
  describe('login', () => {
    it('Should return a LoginResponse with a token', async () => {
      const input: LoginVm = {
        name: 'test',
        password: 'test',
      };
      const result = await controller.login(input);
      expect(result.name).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.token).toEqual('LoginToken');
      expect(result.name).toEqual(input.name);
    });
  });*/
});
