import { Injectable } from '@nestjs/common';
import { IConfig, ISwaggerConfig } from './types';
import { join } from 'path';
import { MailerModuleOptions } from '@devon4node/mailer';
import { ConnectionOptions } from 'typeorm';
import { classToPlain } from 'class-transformer';

// Put the correct value of config dir before load the config package
process.env.NODE_CONFIG_DIR = join(__dirname, '../../../config/');
import { get } from 'config';
import { JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class ConfigurationService implements IConfig {
  get(name: string): any {
    try {
      return process.env[name] || get(name);
    } catch (e) {
      return (get('default') as any)[name];
    }
  }

  get isDev(): boolean {
    return !!this.get('isDev')!;
  }

  get host(): string {
    return this.get('host')!;
  }

  get port(): number {
    return Number(this.get('port')!);
  }

  get globalPrefix(): string {
    return this.get('globalPrefix');
  }

  get jwtConfig(): JwtModuleOptions {
    return this.get('jwtConfig')!;
  }

  get clientUrl(): string {
    return this.get('clientUrl')!;
  }

  get swaggerConfig(): ISwaggerConfig {
    return this.get('swaggerConfig')!;
  }

  get mailerConfig(): MailerModuleOptions {
    return this.get('mailerConfig');
  }

  get database(): ConnectionOptions {
    // return a plain object in order to be modificable by typeorm
    return classToPlain(this.get('database')) as ConnectionOptions;
  }
}
