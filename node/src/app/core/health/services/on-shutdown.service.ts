import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Connection } from 'typeorm';
import { WinstonLogger } from '../../../shared/logger/winston.logger';

@Injectable()
export class OnShutdownService implements OnApplicationShutdown {
  constructor(private readonly connection: Connection, private readonly logger: WinstonLogger) {}

  onApplicationShutdown(signal?: string | undefined): void {
    this.logger.log('Application shutting down by ' + signal);
    this.connection.close();
  }
}
