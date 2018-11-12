export interface JwtPayload {
  name: string;
  role: string;
  iat?: Date;
}
