import { BaseConfig } from '@devon4node/config';
import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsOptional, IsString, ValidateNested, IsDefined, IsNotEmptyObject } from 'class-validator';
import { ConnectionOptions } from 'typeorm';
import { MailerModuleOptions } from '@devon4node/mailer';
import { JwtModuleOptions } from '@nestjs/jwt';

export class LoggerConfiguration {
  @IsOptional()
  @IsString()
  @IsIn(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'])
  loggerLevel?: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';
  @IsOptional()
  @IsString()
  generalLogFile?: string;
  @IsOptional()
  @IsString()
  errorLogFile?: string;
  @IsOptional()
  @IsBoolean()
  console?: boolean;
}
export class SwaggerConfig {
  @IsDefined()
  @IsString()
  swaggerTitle!: string;
  @IsDefined()
  @IsString()
  swaggerDescription!: string;
  @IsDefined()
  @IsString()
  swaggerVersion!: string;
}

export class Config extends BaseConfig {
  @IsOptional()
  @ValidateNested()
  @Type(() => LoggerConfiguration)
  loggerConfig?: LoggerConfiguration;
  @IsDefined()
  @IsNotEmptyObject()
  database!: ConnectionOptions;
  @IsDefined()
  @IsNotEmptyObject()
  mailerConfig!: MailerModuleOptions;
  @IsDefined()
  @ValidateNested()
  @Type(() => SwaggerConfig)
  swaggerConfig?: SwaggerConfig;
  @IsDefined()
  @IsNotEmptyObject()
  jwtConfig!: JwtModuleOptions;
}
