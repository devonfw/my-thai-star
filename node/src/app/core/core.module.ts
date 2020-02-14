import { ClassSerializerInterceptor } from '@devon4node/common/serializer';
import { ConfigModule, ConfigService } from '@devon4node/config';
import { MailerModule } from '@devon4node/mailer';
import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { BusinessLogicFilter } from '../shared/filters/business-logic.filter';
import { WinstonLogger } from '../shared/logger/winston.logger';
import { Config } from '../shared/model/config/config.model';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health/controllers/health.controller';
import { OnShutdownService } from './health/services/on-shutdown.service';
import { UserModule } from './user/user.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      configPrefix: 'mts',
      configDir: join(__dirname, '../../config'),
      configType: Config,
    }),
    UserModule,
    AuthModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<Config>) => {
        return config.values.mailerConfig;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<Config>) => {
        return config.values.database;
      },
      inject: [ConfigService],
    }),
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [
    { provide: APP_FILTER, useClass: BusinessLogicFilter },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    OnShutdownService,
    WinstonLogger,
  ],
  exports: [UserModule, AuthModule, MailerModule, ConfigModule, WinstonLogger],
})
export class CoreModule {}
