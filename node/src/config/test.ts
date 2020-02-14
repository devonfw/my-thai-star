import { join } from 'path';
import { Config } from '../app/shared/model/config/config.model';

const def: Config = {
  isDev: true,
  host: 'localhost',
  port: 8080,
  clientUrl: 'localhost:4200',
  globalPrefix: 'v1',
  loggerConfig: {
    console: false,
    loggerLevel: 'info',
  },
  database: {
    type: 'sqlite',
    database: ':memory:',
    synchronize: false,
    migrationsRun: true,
    logging: false,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migration/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  },
  mailerConfig: {
    mailOptions: {
      streamTransport: true,
      newline: 'windows',
    },
    emailFrom: 'noreply@example.com',
    hbsOptions: {
      templatesDir: join(__dirname, '../..', 'templates/views'),
      partialsDir: join(__dirname, '../..', 'templates/partials'),
      helpers: [
        {
          name: 'bool2word',
          func: (value: boolean): string => (value ? 'accepted' : 'declined'),
        },
        {
          name: 'formatDate',
          func: (value: Date): string => value.toLocaleString(),
        },
        {
          name: 'toNumber',
          func: (value: any): number => Number(value),
        },
      ],
    },
  },
  swaggerConfig: {
    swaggerTitle: 'My Thai Star',
    swaggerDescription: 'API Documentation',
    swaggerVersion: '0.0.1',
  },
  jwtConfig: { secret: 'SECRET', signOptions: { expiresIn: '24h' } },
};

export default def;
