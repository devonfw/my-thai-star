export class UserDetailsTestData {
  static userAreaServiceData = {
    modificationCounter: 10,
    id: 1,
    username: 'waiter',
    email: 'waiter@mail.com',
    twoFactorStatus: false,
    userRoleId: 1,
  };

  static twoFactorData = {
    modificationCounter: 2,
    id: 1,
    username: 'waiter',
    email: 'waiter@mail.com',
    twoFactorStatus: true,
    userRoleId: 1,
  };

  static loadQrCodeData = {
    base64QrCode: 'data:image/png;base64,iVBORw0KGgoAA=',
    secret: 'Z62XJZ3OTRVAGU7J',
  };
}
