import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { JwtPayload } from './jwt-payload';
import { sign } from 'jsonwebtoken';
import { UserService } from '../../management/user/user.service';

jest.mock('../../management/user/user.service');
describe('AuthService', () => {
  let service: AuthService;
  let user: any;
  let payload: JwtPayload;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, AuthService, ConfigurationService],
    }).compile();
    service = module.get<AuthService>(AuthService);
    user = {
      name: 'tester',
      email: 'tester',
      password: 'superpasword',
      role: 'Customer',
    };
    payload = {
      name: user.name,
      role: user.role,
    };
  });
  it('service should be defined', () => {
    expect(service).toBeDefined();
  });
  it('user should be defined', () => {
    expect(user).toBeDefined();
  });
  it('payload should be defined', () => {
    expect(payload).toBeDefined();
  });
  it('payload signature failed', () => {
    expect(sign(payload, 'superkey')).toBeDefined();
  });
});
