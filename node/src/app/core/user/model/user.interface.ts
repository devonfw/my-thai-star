export interface IUser {
  username?: string;
  password?: string;
  secret?: string;
  twoFactorStatus?: boolean;
  email?: string;
  roleId: number;
}
