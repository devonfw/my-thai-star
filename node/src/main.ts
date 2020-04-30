import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NextFunction, Request } from 'express';
import * as helmet from 'helmet';
import { AppModule } from './app/app.module';
import { CoreModule } from './app/core/core.module';
import { WinstonLogger } from './app/shared/logger/winston.logger';
import { ConfigService } from '@devon4node/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLogger(),
  });
  const configModule = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
    }),
  );
  app.setGlobalPrefix(configModule.values.globalPrefix);
  app.use(helmet());
  app.enableCors({
    origin: '*',
    credentials: true,
    exposedHeaders: 'Authorization',
    allowedHeaders: 'authorization, content-type',
  });
  if (configModule.values.isDev) {
    const options = new DocumentBuilder()
      .setTitle(configModule.values.swaggerConfig.swaggerTitle)
      .setDescription(configModule.values.swaggerConfig.swaggerDescription)
      .setVersion(configModule.values.swaggerConfig.swaggerVersion)
      .addBearerAuth()
      .build();

    const swaggerDoc = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup((configModule.values.globalPrefix || '') + '/api', app, swaggerDoc);
  }
  const logger: WinstonLogger = app.select(CoreModule).get(WinstonLogger);
  // Logger middleware
  app.use(function (this: any, req: Request, _res: Response, next: NextFunction) {
    logger.log(req.path, req.ip);
    next();
  });

  app.enableShutdownHooks();
  await app.listen(configModule.values.port);
}
bootstrap();
