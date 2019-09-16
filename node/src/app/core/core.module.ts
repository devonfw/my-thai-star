import { MailerModule } from '@devon4node/mailer';
import { Global, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonLogger } from '../shared/logger/winston.logger';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigurationService } from './configuration/configuration.service';
import { OnShutdownService } from './terminus/on-shutdown.service';
import { TerminusOptionsService } from './terminus/terminus.service';
import { AuthModule } from './auth/auth.module';

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
  providers: [TerminusOptionsService, OnShutdownService, WinstonLogger],
  exports: [
    OnShutdownService,
    ConfigurationModule,
    MailerModule,
    WinstonLogger,
    AuthModule,
  ],
})
export class CoreModule {}
