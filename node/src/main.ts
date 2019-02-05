// Change the config folder before the config library is loaded
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app/app.module';
import { ConfigurationModule } from './app/core/configuration/configuration.module';
import { ConfigurationService } from './app/core/configuration/configuration.service';
import { WinstonLogger } from './app/shared/logger/winston.logger';
import { ValidationPipe } from '@nestjs/common';
import { CoreModule } from './app/core/core.module';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLogger(),
  });

  const configModule = app
    .select(ConfigurationModule)
    .get(ConfigurationService);

  if (configModule.globalPrefix) {
    app.setGlobalPrefix(configModule.globalPrefix);
  }

  if (configModule.isDev) {
    const options = new DocumentBuilder()
      .setTitle(configModule.swaggerConfig.swaggerTitle)
      .setDescription(configModule.swaggerConfig.swaggerDescription)
      .setVersion(configModule.swaggerConfig.swaggerVersion)
      .setHost(configModule.host + ':' + configModule.port)
      .setBasePath(configModule.swaggerConfig.swaggerBasepath)
      .addBearerAuth('Authorization', 'header')
      .build();

    const swaggerDoc = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, swaggerDoc);
  }

  app.use(helmet());
  app.enableCors({
    origin: '*',
    credentials: true,
    exposedHeaders: 'Authorization',
    allowedHeaders: 'authorization, content-type',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const logger: WinstonLogger = app.select(CoreModule).get(WinstonLogger);
  // Logger middleware
  app.use(function(
    this: any,
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    logger.log(req.path, req.ip);
    next();
  });

  app.enableShutdownHooks();
  await app.listen(configModule.port);
}
bootstrap();
