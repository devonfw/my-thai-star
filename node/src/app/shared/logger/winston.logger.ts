/* istanbul ignore file */
import { ConfigService } from '@devon4node/config';
import { Logger, LogLevel, Optional } from '@nestjs/common';
import * as winston from 'winston';
import { Config } from '../model/config/config.model';

export class WinstonLogger extends Logger {
  private static DEFAULT_LOG_LEVEL = 'info';
  private console = true;
  private logger?: winston.Logger;

  constructor(@Optional() private readonly configService?: ConfigService<Config>) {
    super();
    const logLevel = this.configService?.values.loggerConfig?.loggerLevel! || WinstonLogger.DEFAULT_LOG_LEVEL;
    const generalDir = this.configService?.values.loggerConfig?.generalLogFile;
    const errorDir = this.configService?.values.loggerConfig?.errorLogFile;
    const transports: any[] = [];

    if (this.configService?.values.loggerConfig?.console !== undefined) {
      this.console = this.configService?.values.loggerConfig?.console;
    }

    if (generalDir) {
      transports.push(
        new winston.transports.File({
          filename: generalDir,
        }),
      );
    }

    if (errorDir) {
      transports.push(
        new winston.transports.File({
          filename: errorDir,
          level: 'error',
        }),
      );
    }

    this.overrideLogger(logLevel);

    if (transports.length) {
      this.logger = winston.createLogger({
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        level: logLevel,
        transports,
      });
    }
  }

  overrideLogger(level: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'): void {
    const loggerLevels: LogLevel[] = ['debug', 'verbose', 'log', 'warn', 'error'];
    let nestLoggerLevel: string = level;

    if (nestLoggerLevel === 'info' || nestLoggerLevel === 'http') {
      nestLoggerLevel = 'log';
    }

    if (nestLoggerLevel === 'silly') {
      nestLoggerLevel = 'debug';
    }

    const pos = loggerLevels.findIndex(e => e === nestLoggerLevel);

    if (pos !== -1) {
      Logger.overrideLogger(loggerLevels.slice(pos));
    }
  }

  log(message: string, context?: string): void {
    if (this.console) {
      super.log(message, context);
    }
    if (this.logger) {
      this.logger.info({ message, context });
    }
  }

  error(message: string, trace: string, context?: string): void {
    if (this.console) {
      super.error(message, trace, context);
    }
    if (this.logger) {
      this.logger.error({ message, trace, context });
    }
  }

  warn(message: string, context?: string): void {
    if (this.console) {
      super.warn(message, context);
    }
    if (this.logger) {
      this.logger.warn({ message, context });
    }
  }

  debug(message: any, context?: string): void {
    if (this.console) {
      super.debug(message, context);
    }
    if (this.logger) {
      this.logger.debug({ message, context });
    }
  }

  verbose(message: any, context?: string): void {
    if (this.console) {
      super.verbose(message, context);
    }
    if (this.logger) {
      this.logger.verbose({ message, context });
    }
  }
}
