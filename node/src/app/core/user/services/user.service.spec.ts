import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepositoryMock } from '../../../../../test/core/user/user.repository.mock';
import { plainToClass } from 'class-transformer';
import { User } from '../model/entities/user.entity';
import { roles } from '../../auth/model/roles.enum';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepositoryMock;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepositoryMock>('UserRepository');
  });

  it('should be defined after module initialization', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findOne', () => {
    it('should return the user when exists', async () => {
      await expect(service.findOne('user1')).resolves.toStrictEqual({
        id: 1,
        username: 'user1',
        // password: 'user1',
        password: '$2b$12$KgUSTFUTjRqQD7U7tuV9quheR4L.LOAT.GhmTjBIXsgLMhBXjfhYq',
        role: {
          id: roles.Customer,
          name: roles[roles.Customer].toUpperCase(),
        },
      });
    });

    it('should return undefined when the user does not exists', async () => {
      await expect(service.findOne('usernotdefined')).resolves.toBeUndefined();
    });
  });

  describe('registerUser', () => {
    it('should register a new user if it does not exists', async () => {
      const userToAdd: Partial<User> = {
        username: 'user3',
        password: 'user3',
      };
      const userRegistered = await service.registerUser(userToAdd as User);

      expect(userRegistered).toStrictEqual(plainToClass(User, repository.users[2]));
    });

    it('should throw an Error when user already exists', async () => {
      const userToAdd: Partial<User> = {
        username: 'user3',
        password: 'user3',
      };
      await expect(service.registerUser(userToAdd as User)).rejects.toThrowError('User already exists');
    });
  });
});
