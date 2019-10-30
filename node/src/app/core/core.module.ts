import { MailerModule } from '@devon4node/mailer';
import { Global, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonLogger } from '../shared/logger/winston.logger';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigurationService } from './configuration/services/configuration.service';
import { OnShutdownService } from './terminus/services/on-shutdown.service';
import { TerminusOptionsService } from './terminus/services/terminus.service';
import { AuthModule } from './auth/auth.module';
import { ClassSerializerInterceptor } from '@devon4node/common/serializer';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Global()
@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (config: ConfigurationService) => {
        return config.database;
      },
      inject: [ConfigurationService],
    }),
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (config: ConfigurationService) => {
        return config.mailerConfig;
      },
      inject: [ConfigurationService],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [
    TerminusOptionsService,
    OnShutdownService,
    WinstonLogger,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
  exports: [
    OnShutdownService,
    ConfigurationModule,
    MailerModule,
    WinstonLogger,
    AuthModule,
  ],
})
export class CoreModule {}
