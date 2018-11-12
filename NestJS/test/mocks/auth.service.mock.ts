import { SignOptions, sign } from 'jsonwebtoken';
import { JwtPayload } from '../../src/shared/auth/jwt-payload';
import { User } from '../../src/management/user/models/user.entity';

export class AuthServiceMock {
  private jwtOptions: SignOptions;
  private jwtKey: string | undefined;

  constructor() {
    this.jwtOptions = { expiresIn: '8h' };
    this.jwtKey = 'SuperPassword';
  }

  async signPayload(payload: JwtPayload): Promise<string> {
    return sign(payload, this.jwtKey, this.jwtOptions);
  }
  async validatePayload(payload: JwtPayload): Promise<User> {
    const result: User = {
      id: 1,
      username: 'test',
      email: 'test@mail.com',
      password: 'password',
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
    return result;
  }
}
