import { IConfig } from '../app/core/configuration/types';

const test: IConfig = {
  isDev: false,
  host: 'localhost',
  port: 8080,
  jwtConfig: {
    secret: 'key',
    signOptions: { expiresIn: '24h' },
  },
  clientUrl: '',
  swaggerConfig: {
    swaggerTitle: 'Your App Title',
    swaggerDescription: 'API Documentation',
    swaggerVersion: '0.0.1',
    swaggerBasepath: 'api',
  },
  mailerConfig: {
    emailFrom: 'noreply@capgemini.com',
  },
  database: {
    type: 'sqlite',
    database: ':memory:',
    synchronize: false,
    migrationsRun: true,
    logging: true,
    entities: ['./dist/**/*.entity{.js,.ts}'],
    migrations: ['dist/migrations/test/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  },
};

export default test;
