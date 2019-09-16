import { Logger } from '@nestjs/common';
import { join } from 'path';
import * as winston from 'winston';

export class WinstonLogger extends Logger {
  logger: winston.Logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss A ZZ',
      }),
      winston.format.json(),
    ),
    level: 'info',
    transports: [
      new winston.transports.File({
        filename: join(__dirname, '../../../', '/logs/error.log'),
        level: 'error',
      }),
      new winston.transports.File({
        filename: join(__dirname, '../../../', '/logs/general.log'),
      }),
    ],
  });

  log(message: string, context?: string): void {
    super.log(message, context);
    this.logger.info({ message, context });
  }

  error(message: string, trace: string, context?: string) {
    super.error(message, trace, context);
    this.logger.error({ message, trace, context });
  }

  warn(message: string, context?: string) {
    super.warn(message, context);
    this.logger.warn({ message, context });
  }
}
