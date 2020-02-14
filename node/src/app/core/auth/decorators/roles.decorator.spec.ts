import { Roles } from './roles.decorator';
import { roles } from '../model/roles.enum';
import { Reflector } from '@nestjs/core';

@Roles(roles[roles.Customer].toUpperCase(), roles[roles.Waiter].toUpperCase())
class RolesTest {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Roles(roles[roles.Barkeeper].toUpperCase())
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  oneHandler(): void {}
}

describe('Roles', () => {
  it('should reflect metadata in the class and methods', () => {
    const reflector = new Reflector();

    expect(reflector.get('roles', RolesTest)).toStrictEqual(['CUSTOMER', 'WAITER']);
    expect(reflector.get('roles', RolesTest)).not.toStrictEqual(['CUSTOMER']);
    expect(reflector.get('roles', RolesTest)).not.toStrictEqual(['WAITER']);
    expect(reflector.get('roles', RolesTest.prototype.oneHandler)).toStrictEqual(['BARKEEPER']);
  });
});
