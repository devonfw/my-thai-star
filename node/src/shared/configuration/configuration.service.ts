import { Injectable } from '@nestjs/common';
import { Configuration } from './configuration.enum';
import { get } from 'config';

@Injectable()
export class ConfigurationService {
  private enviromentHosting: string = process.env.NODE_ENV || 'development';

  get(name: string) {
    return process.env[name] || get(name);
  }

  get isDevelopment(): boolean {
    return this.enviromentHosting === 'development';
  }

  get swaggerTitle(): string {
    return get(Configuration.SWAGGER_TITLE);
  }

  get swaggerDescription(): string {
    return get(Configuration.SWAGGER_DESCRIPTION);
  }

  get swaggerVersion(): string {
    return get(Configuration.SWAGGER_VERSION);
  }

  get swaggerBasePath(): string {
    return get(Configuration.SWAGGER_BASEPATH);
  }
}
