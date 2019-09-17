import { MailerModuleOptions } from '@devon4node/mailer';
import { ConnectionOptions } from 'typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';

export interface IConfig {
  isDev: boolean;
  host: string;
  port: number;
  globalPrefix?: string;
  jwtConfig: JwtModuleOptions;
  clientUrl: string;
  swaggerConfig: ISwaggerConfig;
  mailerConfig: MailerModuleOptions;
  database: ConnectionOptions;
}

export interface ISwaggerConfig {
  swaggerTitle: string;
  swaggerDescription: string;
  swaggerVersion: string;
  swaggerBasepath: string;
}
