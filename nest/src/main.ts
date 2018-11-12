import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'shared/filters/http-exception.filter';
import * as helmet from 'helmet';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const hostDomain = AppModule.isDev
    ? `${AppModule.host}:${AppModule.port}`
    : AppModule.host;

  if (hostDomain) {
    const swaggerOptions = new DocumentBuilder()
      .setTitle(AppModule.appName)
      .setDescription(AppModule.appDescription)
      .setVersion(AppModule.appVersion)
      .setHost(hostDomain.split('//')[1])
      .setSchemes(AppModule.isDev ? 'http' : 'https')
      .setBasePath(AppModule.appBasePath)
      .addBearerAuth('Authorization', 'header')
      .build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

    app.use(`${AppModule.appBasePath}/docs/swagger.json`, (req, res) => {
      res.send(swaggerDoc);
    });

    SwaggerModule.setup('/api/docs', app, swaggerDoc, {
      swaggerUrl: `${hostDomain}${AppModule.appBasePath}/docs/swagger.json`,
      explorer: true,
      swaggerOptions: {
        docExpansion: 'list',
        filter: true,
        showRequestDuration: true,
      },
    });
  }

  app.setGlobalPrefix(AppModule.appBasePath);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(helmet());
  app.enableCors({
    origin: '*',
    credentials: true,
    exposedHeaders: 'Authorization',
    allowedHeaders: 'authorization, content-type',
  });
  await app.listen(AppModule.port);
}
bootstrap();
